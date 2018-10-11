/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-29 05:26:28 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-11 11:43:47
 * @desc Field_Tree
 */

import React from 'react'
import AbstractField from "../abstract-field";
import { TreeSelect , message} from 'antd';
const TreeNode = TreeSelect.TreeNode;
import request from "utils/request";
import './index.scss';

export default class FiledTree extends AbstractField {
    constructor(props){
      super(props);
      this.state = {
        treeData: [],
        path: [],
        value: []
      }
    }

    render() {
      let opts = {}

      if (this.props._meta.multi === true) {
        opts.mode = 'multiple'
      }
      return (
        <TreeSelect
          {...opts}
          placeholder="请选择"
          dropdownClassName="form-tree-select"
          onChange={this.onChange}
          loadData={this.onLoadData}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          value={this.state.value}
          treeDefaultExpandedKeys={this.state.path}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </TreeSelect>
        );
    }

    componentWillReceiveProps(nextprops){
      if (nextprops.dataMap.length) {
        this.setTopLevelNode(nextprops.dataMap).then(()=>{
          if (this.state.value.length === 0 && nextprops.value) {
            const allPaths = (nextprops.value||'').split(',');
            let queue = [];
            let _nodeId = [];
            let _pathId = [];
            allPaths.forEach(ele => {
              queue.push(()=>{return this.autoExpandByPath(ele.split('x')).then(() => {
                let _treeData = [...this.state.treeData];
                ele.split('x').map((id, index) => {
                  if (!_treeData || _treeData.length === 0) {
                    return;
                  }
                  let findData = _treeData.find(x => x.id == id);

                  if (index === ele.split('x').length - 1) {
                    _nodeId.push(findData.id + '');
                    const curId = findData.children ? findData.id : findData.fatherId;
                    _pathId.push(curId + '');
                    this.setState({
                      value: _nodeId,
                      path: _pathId
                    });
                  } else {
                    _treeData = findData.children;
                  }
                })
              }).catch(e=>{
                console.log(e)
              })})
            });  

            this.asyncQueue(queue)
          }
        });
      }
    }

    /**
     * 选中树节点时调用此函数
     * @param {String/String[]} value ['1'] 选中节点的key
     * @param {String/String[]} label ['人事'] 选中节点的value
     * @param {Object} extra 额外参数 ？？？选中时有triggerNode对象，删除时没有
     */
    onChange = (value, label, extra) => {
      this.setState({ value: value })
      // 执行选中时，否则执行删除
      let propValue = '';
      if (extra.selected) {
        let curPath = extra.triggerNode.props.dataRef._path.join('x');
        propValue = [this.props.value || null, curPath].filter(Boolean).join(',');
      } else {
        propValue = this.props.value.split(',').filter(e => e.split('x').slice(-1)[0] !== extra.triggerValue).join(',');
      }
      this.props.fieldChange(this.props, propValue);
    }

    // 手动展开子结点
    onLoadData =  (treeNode) => {
      if (treeNode.props.children && treeNode.props.children.length > 0) {
        return Promise.resolve()
      }

      const level = treeNode.props.dataRef.level + 1;
      const fatherId = treeNode.props.dataRef.id;
      const subTreeUrl = this.props._dataMap[1];

      return new Promise((resolve,reject) => {
        request.get(subTreeUrl, {
          params: {
          level: level,
          fatherId
        }
       }).then(res => {
          var curPath = treeNode.props.dataRef._path;
          if (res.length === 0) {
            treeNode.props.dataRef.isLeaf = true
          }

          res = res.map((item) => {
            return { ...item,
              _path: curPath.concat(item.id)
            }
          });
          treeNode.props.dataRef.children = res;
          this.setState({});
          resolve();
        })
      });
    }

    renderTreeNodes =  (data) => {
      return data.map((item) => {
        if (item.children) {
          if (item.children.length > 0) {
            return (
              <TreeNode title={item.nodeName} key={item.id} value={String(item.id)}  dataRef={item}>
                {item.children && this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
        }
        return <TreeNode title={item.nodeName} key={item.id} value={String(item.id)} isLeaf={item.isLeaf} dataRef={item} />;
      });
    }

    // 获取顶层结点
    setTopLevelNode = (topNodes) => {
      return new Promise((resolve, reject)=>{
        if (this.state.treeData.length > 0) {
          resolve()
          return 
        }
        this.setState({
          treeData: topNodes.map((item) => {
            return { ...item,
              _path: [item.id]
            };
          })
        }, () => {
          resolve()
        })
      })  
    }

    // 根据初始值自动展开, 主要用于值回显示
    autoExpandByPath = (path) => {
      if (!path || path.length <= 0) {
        Promise.reject(`path(${path}) 不可使用！ `)
      }
      let _path = path.slice(0);
      let _id = _path.shift();
      //获取需要展开的第一个子节点
      let targetNode = this.state.treeData.find(x => x.id == _id)

      if (!targetNode) {
        return Promise.reject()
      }

      return _path.reduce((last, cur) => {
        return last.then(res=>{
          let expectExpand = res.find(x => x.id == cur);
          if (!expectExpand) {
            console.log(res, cur)
            throw new Error('指定的节点中没有发现目标子结点，展开中断')
          }
          return this.expandNode(res.find(x => x.id == cur))
        })
      }, this.expandNode(targetNode))
    }

    async asyncQueue(queue){
      for (let i = 0; i < queue.length; i++) {
        await queue[i]()
      }
    }

    // expand children
    expandNode = (nodeData) => {
      if (!nodeData) {
        throw new Error('nodeData is undefined')
      }
      
      let {level, id: fatherId} = nodeData;
      
      if(nodeData.expanded){
        return Promise.resolve(nodeData.children)
      }
      const subTreeUrl = this.props._dataMap[1];

      return new Promise((resolve, reject) => {
        request('get', subTreeUrl,  {
          level: level + 1,
          fatherId
        }).then(res=>{
          // 拼接path
          res = res.map((item) => {
            return { ...item,
              _path: nodeData._path.concat(item.id)
            }
          });

          if (res && res.length > 0) {
            nodeData.children = res;
            nodeData.expanded = true;
          }
          
          this.setState({}, ()=>{ resolve(res) });
         
        }).catch(e=>{
          reject();
        })
      });
    }
}
