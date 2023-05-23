<!--
Time: 2023-04-10 14:33:18

 * @Description: 保存文件
-->

<template>
    <div class="save-box">
      <!-- <Button style="margin-left: 10px" type="text" @click="beforeClear">
       清空
      </Button> -->
      <Dropdown style="margin-left: 10px" @on-click="saveWith">
        <Button type="primary">
          保存
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <template #list>
          <DropdownMenu>
            <DropdownItem name="clipboard">复制到剪切板</DropdownItem>
            <DropdownItem name="saveImg">保存为图片</DropdownItem>
            <DropdownItem name="saveSvg">保存为svg</DropdownItem>
            <DropdownItem name="saveJson" divided>保存为JSON格式</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
  </template>
  
  <script setup name="save-bar">
  import { Modal } from 'view-ui-plus';
  import { clipboardText } from '@/utils/utils.js';
  import useSelect from '@/hooks/select';
  import { v4 as uuid } from 'uuid';
  import { debounce } from 'lodash-es';
  import { useI18n } from 'vue-i18n';
  
  const { canvas } = useSelect();
  const cbMap = {
    clipboard() {
      const jsonStr = canvas.editor.getJson();
      clipboardText(JSON.stringify(jsonStr, null, '\t'));
    },
  
    saveJson() {
      const dataUrl = canvas.editor.getJson();
      const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataUrl, null, '\t')
      )}`;
      downFile(fileStr, 'json');
    },
  
    saveSvg() {
      const workspace = canvas.c.getObjects().find((item) => item.id === 'workspace');
      const { left, top, width, height } = workspace;
      const dataUrl = canvas.c.toSVG({
        width,
        height,
        viewBox: {
          x: left,
          y: top,
          width,
          height,
        },
      });
      const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`;
      downFile(fileStr, 'svg');
    },
  
    saveImg() {
      const workspace = canvas.c.getObjects().find((item) => item.id === 'workspace');
      canvas.editor.ruler.hideGuideline();
      const { left, top, width, height } = workspace;
      const option = {
        name: 'New Image',
        format: 'png',
        quality: 1,
        left,
        top,
        width,
        height,
      };
      canvas.c.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.c.toDataURL(option);
      downFile(dataUrl, 'png');
      canvas.editor.ruler.showGuideline();
    },
  };
  
  const saveWith = debounce(function (type) {
    cbMap[type] && typeof cbMap[type] === 'function' && cbMap[type]();
  }, 300);
  
  /**
   * @desc clear canvas 清空画布
   */
  const clear = () => {
    canvas.c.getObjects().forEach((obj) => {
      if (obj.id !== 'workspace') {
        canvas.c.remove(obj);
      }
    });
    canvas.c.discardActiveObject();
    canvas.c.renderAll();
  };
  
  const beforeClear = () => {
    Modal.confirm({
      title: `提示`,
      content: `<p>清理提示</p>`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => clear(),
    });
  };
  
  function downFile(fileStr, fileType) {
    const anchorEl = document.createElement('a');
    anchorEl.href = fileStr;
    anchorEl.download = `${uuid()}.${fileType}`;
    document.body.appendChild(anchorEl); // required for firefox
    anchorEl.click();
    anchorEl.remove();
  }
  </script>
  
  <style scoped lang="less">
  .save-box {
    display: inline-block;
    padding-right: 10px;
  }
  </style>
  