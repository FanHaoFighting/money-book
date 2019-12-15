import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import PriceForm from '../components/PriceForm'
import Loader from '../components/Loader'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import withContext from '../WithContext'
const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

export class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 组件初始状态为支出
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true,
    }
  }
  
  componentDidMount() {
    // 从router中拿到id
    const { id } = this.props.match.params

    this.props.actions.getEditData(id).then(data => {
      const { editItem, categories } = data
      this.setState({
        selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
        selectedCategory: (id && editItem) ? categories[editItem.cid] : null,        
      })
    })
  }
}


CreatePage.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
}

export default withRouter(withContext(CreatePage))