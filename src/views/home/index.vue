<style lang="less" scoped>
@import "~./index.less";
</style>
<template>
  <div class="home">
    <Layout>
      <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
      <Header v-if="show">
        header
        <space>
          <RadioGroup v-model="selectValue" button-style="solid" type="button">
            <Radio label="厂房"></Radio>
            <Radio label="配电箱"></Radio>
            <Radio label="电缆"></Radio>
            <Radio label="爬梯"></Radio>
          </RadioGroup>
          <Divider type="vertical" />
          <history></history>
        </space>
      </Header>
      <!-- 画布区域 -->
      <Content style="display: flex; height: calc(100vh - 64px)">
        <div v-if="show" style="width: 380px; height: 100%; background: #fff; display: flex">
          <Menu :active-name="menuActive" accordion @on-select="(activeIndex) => (menuActive = activeIndex)" width="65px">
          <!-- <MenuItem :name="1" class="menu-item">
            <Icon type="md-book" size="24" />
            <div>模板</div>
                                    </MenuItem> -->
            <MenuItem :name="1" class="menu-item">
            <Icon type="md-images" size="24" />
            <div>元素</div>
            </MenuItem>
          <!-- <MenuItem :name="3" class="menu-item">
            <Icon type="md-reorder" size="24" />
            <div>布局</div>
                                    </MenuItem> -->
          </Menu>
          <div class="content">
            <!-- 常用元素 -->
            <div v-show="menuActive === 1" class="left-panel">
              <tools></tools>
            </div>
            <!-- 背景设置 -->
          <!-- <div v-show="menuActive === 3" class="left-panel">
              <layer></layer>
                                      </div> -->
          </div>
        </div>
        <div id="workspace" style="width: 100%; position: relative; background: #f1f1f1">
          <div class="canvas-box">
            <div class="inside-shadow"></div>
            <canvas id="canvas" :class="ruler ? 'design-stage-grid' : ''"></canvas>
          <!-- <dragMode></dragMode>
        <zoom></zoom>
                                            <mouseMenu></mouseMenu> -->
          </div>
        </div>
        <div style="width: 530px; height: 100%; padding: 10px; overflow-y: auto; background: #fff">
          <!-- <set-size></set-size> -->
        </div>
      </Content>
    </Layout>
  </div>
</template>
  
<script>
import EditorWorkspace from '@/core/EditorWorkspace';
import HelloWorld from '@/components/HelloWorld.vue'
//左侧元素组件
import tools from '@/components/tools.vue';
import setSize from '@/components/setSize.vue';
//核心功能组件
import Editor from '@/core';
import CanvasEventEmitter from '@/utils/event/notifier';
// 右侧组件
import history from '@/components/history.vue';
import { fabric } from 'fabric';
const event = new CanvasEventEmitter()
const canvas = {}
export default {
  name: 'App',
  provide: {
    canvas,
    fabric,
    event,
  },
  components: {
    HelloWorld,
    tools,
    setSize,
    history
  },
  data() {
    return {
      menuActive: 1,
      show: false,
      select: null,
      ruler: false,
      selectValue: '厂房'
    }
  },
  watch: {
    ruler: {
      handler(value) {
        if (!this.canvas.ruler) return;
        if (value) {
          this.canvas.ruler.enable();
        } else {
          this.canvas.ruler.disable();
        }
      },
    },
  },
  mounted() {
    // this.canvas = new fabric.Canvas('canvas', {
    //   fireRightClick: true, // 启用右键，button的数字为3
    //   stopContextMenu: true, // 禁止默认右键菜单
    //   controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    // });
    // this.$Spin.hide();

    //绑定画布
    this.canvas = new fabric.Canvas('canvas', {
      stopContextMenu: true,
      controlsAboveOverlay: true,
      fireRightClick: true,
      backgroundColor: 'rgb(255,255,255)',
    })

    // console.log(canvas.c);
    // // 将矩形添加到画布中
    // canvas.c.add(rect)
    canvas.c = this.canvas;
    event.init(canvas.c);
    canvas.editor = new Editor(canvas.c);

    canvas.c.renderAll();

    this.show = true;
  },
  methods: {
    // 获取字体数据 新增字体样式使用
    getFontJson() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        const json = activeObject.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls']);
        console.log(json);
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(json, null, '\t')
        )}`;
        downFile(fileStr, 'font.json');
        const dataUrl = activeObject.toDataURL();
        downFile(dataUrl, 'font.png');
      }
    },
  }
}
</script>
<style lang="less" scoped></style>
  
  