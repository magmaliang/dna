/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 15:22:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 22:50:39
 * @Desc: 编排生成DSL的舞台 
 */

import React from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import _ from "lodash";
import Fields from "cmps/form/fields";
import { filterFields } from "cmps/form/utils";

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
        fieldKey: dsl.fieldKey
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
