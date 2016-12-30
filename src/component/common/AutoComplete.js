import React, { Component ,PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import Request from '../../utils/Request';


var DEFAULT_SUGGEST_LIMIT = 10;
var DEFAULT_TIMEOUT = 500;
export default class AutoComplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            inputValue: props.defaultValue || ''
        };

        this.timer = null;
    }

    static propTypes = {
        ajax: PropTypes.object,// 调用ajax所需参数, url:地址, params:请求参数, method:方法,不传默认为GET
        onChange: PropTypes.func,
        defaultValue: PropTypes.string,
        inputParamName: PropTypes.string,//
        onSuggestSelected: PropTypes.func,// 选择自动提示后执行
        placeholder: PropTypes.string,
        getSuggestFromResp: PropTypes.func,// 指定如何从返回数据中取出suggestion, 取出数据必须为数组, 例如 resp => resp.data.items
        renderSuggest: PropTypes.func,// 指定如何根据数据渲染suggestion
        getSuggestValue: PropTypes.func,// 指定如何由suggestions数组中的元素计算出最终显示到输入框的值
        timeout: PropTypes.number,// 每次请求的时间间隔,单位毫秒,
        isDataLegal: PropTypes.func
    };

    render() {
        let self = this;
        const {placeholder, value, onChange, getSuggestValue, renderSuggest, isDataLegal} = this.props;
        const {suggestions, inputValue} = this.state;
        let inputProps = {
            placeholder: placeholder,
            value: inputValue,
            onChange: (e, {newValue}) => {
                onChange && onChange(newValue);
                self.setState({inputValue: newValue});
            },
            onBlur: () => {
                if (isDataLegal && isDataLegal() !== true) {
                    self.setState({inputValue: ''})
                }
            }
        };
        return (
            <Autosuggest inputProps={inputProps}
                         className="123"
                         suggestions={suggestions}
                         onSuggestionsUpdateRequested={::this.fetchSuggestion}
                         getSuggestionValue={getSuggestValue}
                         renderSuggestion={renderSuggest}
                         onSuggestionSelected={::this.onSuggestSelected}/>
        );
    }

    onSuggestSelected(e, { suggestion, suggestionValue, sectionIndex }) {
        const {onChange, onSuggestSelected} = this.props;
        onChange && onChange(suggestionValue);
        onSuggestSelected && onSuggestSelected(suggestion);
    }

    fetchSuggestion({value}) {
        let self = this;
        let {timeout} = this.props;
        // 设置输入触发请求的最小时间间隔
        if (this.timer == null) {
            this.timer = setTimeout(() => {
                self.timer = null;
                self.doAjaxRequest(this.state.inputValue);
            }, timeout || DEFAULT_TIMEOUT);
            this.doAjaxRequest(value);
        }
    }

    doAjaxRequest(value) {
        let self = this;
        let {ajax, inputParamName, suggestLimit} = this.props;
        Request({
            url: ajax.url,
            method: ajax.method || 'GET',
            data: Object.assign({}, ajax.params || {}, {[inputParamName]: value}),
            onSuc: resp => {
                // 返回结果时先判断请求的参数与当前输入框的值是否一样, 防止先发后到的请求覆盖后发的请求
                if (value == self.state.inputValue) {
                    let suggestions = self.props.getSuggestFromResp(resp);
                    let splice = suggestLimit || DEFAULT_SUGGEST_LIMIT;
                    self.setState({suggestions: suggestions.splice(0, splice > suggestions.length ? suggestions.length : splice)});
                }
            }
        });
    }

};