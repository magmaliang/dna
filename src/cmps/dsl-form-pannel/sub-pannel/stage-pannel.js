/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 15:22:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-27 12:37:09
 * @Desc: 编排生成DSL的舞台 
 */

import React from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import _ from "lodash";
import {Fields} from "@dna-js/dna-form";

/**
 * 格式化fields数组，主要用于添加默认值
 * @param {*} fields 
 */
function filterFields(fields = [], parentContext = {}){
  // 补全默认值
  fields.forEach(x=>{
     x._meta = Object.assign({
       visible: true,
       status: parentContext.status,
       extendValue: true
     }, x._meta)

     // 如果是展示状态的组件，则直接转化为detail-field
     if (x._meta.status === 'detail') {
       x._originType = x._type;
       x._type = 'Field_DetailField'
     }

     if (x._meta.status === 'disabled') {
       x.disabled = true;
     }
  })

  const visibleFields = fields.filter(x => x._meta.visible)

  return visibleFields
}

import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

export default class FormStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  // ? 根据描述字段生成组件化身的排列, 需要重构
  generateDOM() {
    return _.map(this.props.layout, (l, i) => {
      let {dsl} = l;
      let Cmp = Fields.getDefFromField(dsl)

      // 适配 form 的文件
      dsl = filterFields([dsl])[0]
      let fieldProps = Object.assign({}, dsl, {
        _type: dsl._type,
        _meta: dsl._meta,
        value: dsl.defaultValue,
        fieldKey: dsl.fieldKey,
        reloadingDataMap: ()=>{}
      })

      return (
        <div key={dsl._id} data-grid={l} className="field-display" onClick={this.avatarActive.bind(this, l)} >
          <Form.Item
            label={dsl.fieldName}
          >
            <Cmp {...fieldProps} />
          </Form.Item>
        </div>
      );
    });
  }

  avatarActive(dsl){
   this.props.avatarActive(dsl)
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div>
        <button onClick={this.onCompactTypeChange}>
          2 columns
        </button>
        <ReactGridLayout
          {...this.props}
          onLayoutChange={this.onLayoutChange}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
}

FormStage.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

FormStage.defaultProps = {
  className: "layout",
  rowHeight: 43,
  cols: 6,
  width: 1200
};
