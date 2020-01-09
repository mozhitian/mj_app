(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/popup"],{

/***/ 349:
/*!***************************************************!*\
  !*** E:/phpstudy/WWW/aassdd/components/popup.vue ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup.vue?vue&type=template&id=327e43da&name=popup& */ 350);
/* harmony import */ var _popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup.vue?vue&type=script&lang=js& */ 352);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popup.vue?vue&type=style&index=0&lang=css& */ 354);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);






/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__["render"],
  _popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "phpstudy/WWW/aassdd/components/popup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 350:
/*!*********************************************************************************************!*\
  !*** E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=template&id=327e43da&name=popup& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./popup.vue?vue&type=template&id=327e43da&name=popup& */ 351);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_template_id_327e43da_name_popup___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 351:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=template&id=327e43da&name=popup& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 352:
/*!****************************************************************************!*\
  !*** E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./popup.vue?vue&type=script&lang=js& */ 353);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 353:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











































var _bus = _interopRequireDefault(__webpack_require__(/*! ../bus.js */ 61));


var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var uniPopup = function uniPopup() {return Promise.all(/*! import() | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 314));};var sxqm = function sxqm() {return __webpack_require__.e(/*! import() | components/sxqm/begin */ "components/sxqm/begin").then(__webpack_require__.bind(null, /*! ../components/sxqm/begin.vue */ 430));};
// import move from "../components/sxqm/cs.vue"
var _default = {
  name: "popup",
  data: function data() {
    return {
      //内容
      popupContent: '',
      popupSelect: true,
      popupOperation: '提交',
      popupOperationf: '',
      popupOperationt: '',
      //委托id
      id: '',
      state: '', //所处状态
      img: '', //签名后的base64
      base: '',
      e: '', //记录点击的是第几个
      pathArr: [] //授权手写签名地址
    };
  },
  components: {
    uniPopup: uniPopup,
    sxqm: sxqm
    // move
  },
  props: {},


  methods: {
    getImgVal: function getImgVal(e) {
      // console.log(e);
      this.img = e;
      this.$refs.qmtp.close();
    },
    openqmtp: function openqmtp() {
      this.$refs.qmtp.open();
    },
    openPopup: function openPopup(_ref) {var _ref2 = _slicedToArray(_ref, 2),id = _ref2[0],state = _ref2[1];
      this.$store.state.state = state;
      console.log(333);
      this.id = id;
      this.state = state;
      console.log(this.state + ' ' + this.id);
      if (this.state == 'a1&b' || this.state == 'a7&b' || this.state == 'a10&b' || this.state == 'a11&b' || this.state ==
      'a12&b') {
        this.$refs.popupAff.open();
        this.popupContent = "请选择操作";
        this.popupSelect = true;
      } else if (this.state == 'a2&b' || this.state == 'a4&b') {
        this.$refs.popupAff.open();
        this.popupContent = "请选择任务状态";
        this.popupOperationf = '提交派工';
        this.popupOperationt = "提交延期";
        this.popupSelect = false;
      } else if (this.state == 'a4&r') {
        this.$refs.popupAff.open();
        this.popupContent = "提交派工";
        this.popupSelect = true;
      } else if (this.state == 'a3&g' || this.state == 'a3&b') {
        if (this.$store.state.process == '试验') {
          this.$refs.popupAff.open();
          this.popupContent = "请选择任务状态";
          this.popupOperationf = '删除';
          this.popupOperationt = "提交";
          this.popupSelect = false;
        }
        console.log(this.$store.state.option);

      } else if (this.state == 'a5&b' || this.state == 'a5&g' || this.state == 'a6&b' || this.state == 'a8&b' || this.state ==
      'a9&b') {
        this.$refs.popupAff.open();
        this.popupContent = "请选择任务状态";
        this.popupOperationf = '驳回';
        this.popupOperationt = "提交";
        this.popupSelect = false;
      } else if (this.state == 'a3&r' || this.state == 'a5&r' || this.state == 'a7&r') {
        this.$refs.popupAff.open();
        this.popupContent = "请先修改完错误的信息";
        this.popupOperation = "取消";
        this.popupSelect = true;
      }
    },
    closePopupAff: function closePopupAff(e) {var _this = this;
      //手写签名
      if (this.state == 'a1&b' || this.state == 'a3&g' || this.state == 'a3&b' || this.state == 'a5&g' || this.state ==
      'a5&b' || this.state == 'a6&b' || this.state == 'a8&b' || this.state == 'a9&b') {
        if (this.state == 'a3&g' || this.state == 'a3&b') {
          if (this.$store.state.process == '试验') {
            this.$refs.popupAft.open();
            this.e = e;
          } else {

          }
        } else {
          this.$refs.popupAft.open();
          this.e = e;
        }
      } else if (this.state == 'a2&b' || this.state == 'a4&b' || this.state == 'a4&r' || this.state == 'a7&b' || this.state ==
      'a10&b' || this.state == 'a11&b' || this.state == 'a12&b') {//不需要手写签名
        console.log(e + ' ' + 222);
        uni.request({
          url: this.apiServer + '/basicdata/upState.php',
          data: {
            flag: this.state,
            flage: e,
            id: this.id },

          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' //POST头信息
          },
          success: function success(res) {
            res = res.data;
            console.log(res.result);
            if (res.result == 'success') {
              _this.$refs.popupAff.close();
              _this.$emit('reload', [_this.id, _this.state, e]);
              uni.showToast({
                icon: 'none',
                title: '提交成功' });

            }
          },
          fail: function fail(error) {
            console.log(error);
          } });

      } else if (this.state == 'a3&r' || this.state == 'a5&r') {//需要修改

      }
      this.$refs.popupAff.close();
    },
    //手写签名
    closePopupAft: function closePopupAft() {
      // console.log(this.id);
      if (this.img == '') {
        uni.showToast({
          icon: 'none',
          title: '请先选择手写签名图片' });

      } else if (this.e != '') {
        var _that = this;
        if (this.img.indexOf('tmp') == -1) {
          _that.img = _that.img.split("/uploads/")[1] + "~*^*~";
          console.log(_that.img);
          uni.request({
            url: _that.apiServer + '/basicdata/tpsc.php',
            data: {
              img: _that.img,
              flag: _that.state,
              flage: _that.e,
              id: _that.id },

            dataType: 'json',
            header: {
              'Content-type': 'application/x-www-form-urlencoded' },

            method: 'POST',
            success: function success(res) {
              if (res.data.result == 'success') {
                _that.img = '';
                _that.$refs.popupAft.close();
                _that.$emit('reload', [_that.id, _that.state, _that.e]);
                if (_that.state == 'a1&b') {
                  uni.showToast({
                    icon: 'none',
                    title: '提交成功' });

                } else if (_that.state == 'a3&b' && _that.e == 1) {
                  uni.showToast({
                    icon: 'none',
                    title: '删除成功' });

                } else if (_that.state == 'a3&g' && _that.e == 1) {
                  uni.showToast({
                    icon: 'none',
                    title: '删除成功' });

                } else if (_that.state == 'a3&b' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '提交成功' });

                } else if (_that.state == 'a3&g' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '提交成功,本次试验数据填写未完成' });

                } else if (_that.state == 'a5&g' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '提交失败,本次试验数据填写未完成' });

                } else if (_that.state == 'a5&b' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '提交成功' });

                } else if (_that.state == 'a3&g') {
                  uni.showToast({
                    icon: 'none',
                    title: '删除成功' });

                } else if (_that.state == 'a5&b' && _that.e == 1) {
                  _that.$emit("openCtd");
                } else if (_that.state == 'a5&g' && _that.e == 1) {
                  _that.$emit("openCtd");
                } else if (_that.state == 'a6&b' && _that.e == 1) {
                  // uni.showToast({
                  // 	icon: 'none',
                  // 	title: '驳回成功'
                  // });
                  _that.$emit("openCtd");
                } else if (_that.state == 'a6&b' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '提交成功' });

                } else if (_that.state == 'a8&b' && _that.e == 1) {
                  uni.showToast({
                    icon: 'none',
                    title: '驳回成功' });

                } else if (_that.state == 'a8&b' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '审核成功' });

                } else if (_that.state == 'a9&b' && _that.e == 1) {
                  uni.showToast({
                    icon: 'none',
                    title: '驳回成功' });

                } else if (_that.state == 'a9&b' && _that.e == 2) {
                  uni.showToast({
                    icon: 'none',
                    title: '批准成功' });

                }
              }
              console.log(res.data);
            },

            fail: function fail(err) {
              console.log(err);
            } });


        } else {
          var savedFilePath = this.img; //相对路径
          // console.log(savedFilePath);
          var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
          // console.log(savedFilePath);
          var fileReader = new plus.io.FileReader();
          fileReader.readAsDataURL(path);
          console.log(this.apiServer);
          fileReader.onloadend = function (evt) {//读取文件成功完成的回调函数
            // console.log(evt.target.result); //输出base64内容					
            _that.base = evt.target.result;
            uni.request({
              url: _that.apiServer + '/basicdata/tpsc.php',
              data: {
                img: _that.base,
                flag: _that.state,
                flage: _that.e,
                id: _that.id },

              dataType: 'json',
              header: {
                'Content-type': 'application/x-www-form-urlencoded' },

              method: 'POST',
              success: function success(res) {
                if (res.data.result == 'success') {
                  _that.img = '';
                  _that.$refs.popupAft.close();
                  _that.$emit('reload', [_that.id, _that.state, _that.e]);
                  if (_that.state == 'a1&b') {
                    uni.showToast({
                      icon: 'none',
                      title: '提交成功' });

                  } else if (_that.state == 'a3&b' && _that.e == 1) {
                    uni.showToast({
                      icon: 'none',
                      title: '删除成功' });

                  } else if (_that.state == 'a3&g' && _that.e == 1) {
                    uni.showToast({
                      icon: 'none',
                      title: '删除成功' });

                  } else if (_that.state == 'a3&b' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '提交成功' });

                  } else if (_that.state == 'a3&g' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '提交成功,本次试验数据填写未完成' });

                  } else if (_that.state == 'a5&g' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '提交失败,本次试验数据填写未完成' });

                  } else if (_that.state == 'a5&b' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '提交成功' });

                  } else if (_that.state == 'a3&g') {
                    uni.showToast({
                      icon: 'none',
                      title: '删除成功' });

                  } else if (_that.state == 'a5&b' && _that.e == 1) {
                    _that.$emit("openCtd");
                  } else if (_that.state == 'a5&g' && _that.e == 1) {
                    _that.$emit("openCtd");
                  } else if (_that.state == 'a6&b' && _that.e == 1) {
                    // uni.showToast({
                    // 	icon: 'none',
                    // 	title: '驳回成功'
                    // });
                    _that.$emit("openCtd");
                  } else if (_that.state == 'a6&b' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '提交成功' });

                  } else if (_that.state == 'a8&b' && _that.e == 1) {
                    uni.showToast({
                      icon: 'none',
                      title: '驳回成功' });

                  } else if (_that.state == 'a8&b' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '审核成功' });

                  } else if (_that.state == 'a9&b' && _that.e == 1) {
                    uni.showToast({
                      icon: 'none',
                      title: '驳回成功' });

                  } else if (_that.state == 'a9&b' && _that.e == 2) {
                    uni.showToast({
                      icon: 'none',
                      title: '批准成功' });

                  }
                }
                console.log(res.data);
              },

              fail: function fail(err) {
                console.log(err);
              } });

          };
        }

      } else {
        var _that = this;
        var savedFilePath = this.img; //相对路径
        // console.log(savedFilePath);
        var path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
        // console.log(savedFilePath);
        var fileReader = new plus.io.FileReader();
        fileReader.readAsDataURL(path);
        console.log(this.apiServer);
        fileReader.onloadend = function (evt) {//读取文件成功完成的回调函数
          // console.log(evt.target.result); //输出base64内容					
          _that.base = evt.target.result;
          uni.request({
            url: _that.apiServer + '/basicdata/tpsc.php',
            data: {
              img: _that.base,
              flag: _that.state,
              id: _that.id },

            dataType: 'json',
            header: {
              'Content-type': 'application/x-www-form-urlencoded' },

            method: 'POST',
            success: function success(res) {
              if (res.data.result == 'success') {
                _that.$refs.popupAft.close();
                _that.$emit('reload', [_that.id, _that.state]);
                uni.showToast({
                  icon: 'none',
                  title: '提交成功' });

              }
              console.log(res.data);
            },

            fail: function fail(err) {
              console.log(err);
            } });

        };
      }

    } },



  created: function created() {var _this2 = this;
    this.e = '';
    var value = uni.getStorageSync('setUserData');
    if (value) {
      // console.log("已登录用户:", value);
      uni.request({
        url: this.apiServer + '/account_regulate/otherPic.php',
        data: {
          phone: value.shji },

        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' //POST头信息
        },
        success: function success(res) {
          console.log(res.data);
          res = res.data;
          var arr = (res.qmtp || '').split("||");
          arr.splice(0, 1);
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("~*^*~")[0];
            var path = _this2.apiServer + '/uploads/' + arr[i];
            console.log(path);
            _this2.pathArr.push(path);
          }
        },
        fail: function fail(error) {
          console.log(error);
        } });

    }
  },
  mounted: function mounted() {
    var this_ = this;
    _bus.default.$on('getTemPath', function (e) {
      this_.img = e;
    });

  },
  watch: {},


  computed: {} };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 354:
/*!************************************************************************************!*\
  !*** E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./popup.vue?vue&type=style&index=0&lang=css& */ 355);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 355:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/phpstudy/WWW/aassdd/components/popup.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/popup-create-component',
    {
        'components/popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(349))
        })
    },
    [['components/popup-create-component']]
]);                
