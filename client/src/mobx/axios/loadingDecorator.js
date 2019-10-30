import React, { Component } from "react";
// import { Spin,message } from 'antd';
import axios from "axios";
import styles from "./loading.less";

//这是一个拦截层，用于全局处理错误对象
export function loadingDecorator(Target) {
  class Index extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        instance: {}
      };
    }
    componentDidMount() {
      this.state.instance.request = axios.interceptors.request.use(
        config => {
          this.setState({
            loading: true
          });
          config.headers.Authorization = window.$.cookie("token");
          console.log("发送请求", config);
          return config;
        },
        error => {
          this.setState({
            loading: false
          });
          return Promise.reject(error);
        }
      );

      this.state.instance.response = axios.interceptors.response.use(
        response => {
          this.setState({
            loading: false
          });
          console.log("收到回应", response);
          return response.data.result;
        },
        error => {
          this.setState({
            loading: false
          });
          console.log(error);
          if (error.response.status == 401) {
            // message.error("您尚未登录或登录过期，为您跳转至登录页")
            window.location.hash = "#/login";
          } else {
            // message.error("请求失败"+error)
          }
          console.log("收到回应", error.response);
          return Promise.reject(error);
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.response.eject(this.state.instance.response);
      axios.interceptors.request.eject(this.state.instance.request);
    }

    render() {
      return (
        // <Spin style={{height:"100%"}} spinning={this.state.loading}>
        //         <Target {...this.props} />
        // </Spin>
        <div id={styles.outer}>
          {/* 全局loading动画 */}
          <div className={this.state.loading ? styles.loading_container : ""}>
            <div className={this.state.loading ? styles.loading : ""}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <Target {...this.props} />
        </div>
      );
    }
  }
  return Index;
}
