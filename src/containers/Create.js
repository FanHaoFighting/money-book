import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import CategorySelect from "../components/CategorySelect";
import { Tabs, Tab } from "../components/Tabs";
import PriceForm from "../components/PriceForm";
import Loader from "../components/Loader";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import withContext from "../WithContext";
const tabsText = [TYPE_OUTCOME, TYPE_INCOME];

export class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 组件初始状态为支出
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true
    };
  }

  componentDidMount() {
    // 从router中拿到id
    const { id } = this.props.match.params;

    this.props.actions.getEditData(id).then(data => {
      const { editItem, categories } = data;
      this.setState({
        // 根据是在编辑or新建来确定状态
        selectedTab:
          id && editItem ? categories[editItem.cid].type : TYPE_OUTCOME,
        selectedCategory: id && editItem ? categories[editItem.cid] : null
      });
    });
  }

  /**
   * 选择tab
   */
  tabChange = index => {
    this.setState({
      selectedTab: tabsText[index]
    });
  };
  /**
   * 选择分类
   */
  selectCategory = category => {
    this.setState({
      selectedCategory: category
    });
  };
  /**
   * 取消提交, 通过router实现功能
   */
  cancelSubmit = () => {
    this.props.history.push("/");
  };

  /**
   * 提交信息
   */
  submitForm = (data, isEditMode) => {
    // 必填项目
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      });
      return;
    }
    if (!isEditMode) {
      // create
      this.props.actions
        .createItem(data, this.state.selectedCategory.id)
        .then(this.navigateToHome);
    } else {
      // update
      this.props.actions
        .updateItem(data, this.state.selectedCategory.id)
        .then(this.navigateToHome);
    }
    this.props.history.push("/");
  };
  /**
   * 导航至首页
   */
  navigateToHome = () => {
    this.props.history.push("/");
  };
  render() {
    const { data } = this.props;
    const { items, categories } = data;
    // router中取到id
    const { id } = this.props.match.params;
    // 新建项目or修改项目
    const editItem = id && items[id] ? items[id] : {};
    const { selectedTab, selectedCategory, validationPassed } = this.state;
    // 选中Tab对应需要展示的项目
    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id]);
    const tabIndex = tabsText.findIndex(text => text === selectedTab);
    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}}>
        // 加载中渲染Loader组件
        { data.isLoading &&
          <Loader />
        }
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
      </div>
    )
  }
}

CreatePage.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object
};

export default withRouter(withContext(CreatePage));
