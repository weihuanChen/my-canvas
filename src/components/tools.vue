<!--工具栏,原型，矩形，线段-->
<template>
    <div>
        <Divider>
            基础元素
        </Divider>
        <div class="tool-box">
            <span>
                <span @click="() => addRect()" :draggable="true" @dragend="onDragend('rect')">
                    <svg t="1650855811131" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="18499" width="26" height="26">
                        <path
                            d="M864 896H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h704a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zM192 832h640V192H192v640z"
                            p-id="18500"></path>
                    </svg>
                </span>
                <span @click="() => addCircle()" :draggable="true" @dragend="onDragend('circle')">
                    <svg t="1650855860236" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="19440" width="26" height="26">
                        <path
                            d="M512 928C282.624 928 96 741.376 96 512S282.624 96 512 96s416 186.624 416 416-186.624 416-416 416z m0-768C317.92 160 160 317.92 160 512s157.92 352 352 352 352-157.92 352-352S706.08 160 512 160z"
                            p-id="19441"></path>
                    </svg>
                </span>
            </span>
        </div>
        <Divider plain orientation="left">绘线工具</Divider>
        <div class="tool-box">
            <span @click="drawingLineModeSwitch(false)" :class="isDrawingLineMode && !isArrow && 'bg'">
                <svg t="1673022047861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4206" width="20" height="20">
                    <path
                        d="M187.733333 1024h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM34.133333 989.866667h136.533334v-136.533334H34.133333v136.533334zM1006.933333 204.8h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM853.333333 170.666667h136.533334V34.133333h-136.533334v136.533334z"
                        fill="" p-id="4207"></path>
                    <path
                        d="M187.733333 853.333333c-3.413333 0-10.24 0-13.653333-3.413333-6.826667-6.826667-6.826667-17.066667 0-23.893333l648.533333-648.533334c6.826667-6.826667 17.066667-6.826667 23.893334 0s6.826667 17.066667 0 23.893334l-648.533334 648.533333c0 3.413333-6.826667 3.413333-10.24 3.413333z"
                        fill="" p-id="4208"></path>
                </svg>
            </span>
            <span @click="drawingLineModeSwitch(true)" :class="isDrawingLineMode && isArrow && 'bg'">
                <!-- <svg t="1673022047861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4206" width="20" height="20"><path d="M187.733333 1024h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM34.133333 989.866667h136.533334v-136.533334H34.133333v136.533334zM1006.933333 204.8h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM853.333333 170.666667h136.533334V34.133333h-136.533334v136.533334z" fill="" p-id="4207"></path><path d="M187.733333 853.333333c-3.413333 0-10.24 0-13.653333-3.413333-6.826667-6.826667-6.826667-17.066667 0-23.893333l648.533333-648.533334c6.826667-6.826667 17.066667-6.826667 23.893334 0s6.826667 17.066667 0 23.893334l-648.533334 648.533333c0 3.413333-6.826667 3.413333-10.24 3.413333z" fill="" p-id="4208"></path></svg> -->
                <svg t="1673026778912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2659" width="20" height="20">
                    <path
                        d="M320 738.133333L827.733333 230.4l-29.866666-29.866667L290.133333 708.266667v-268.8h-42.666666v341.333333h341.333333v-42.666667H320z"
                        fill="#444444" p-id="2660"></path>
                </svg>
            </span>
        </div>
    </div>
</template>
<script>
import { v4 as uuid } from 'uuid';
import initializeLineDrawing from '@/core/initializeLineDrawing';
import { getPolygonVertices } from '@/utils/math';
// 默认属性
const defaultPosition = { shadow: '', fontFamily: 'arial' };
// 拖拽属性
const dragOption = {
    left: 0,
    top: 0,
};
export default {
    name: 'ToolBar',
    inject: ['canvas', 'fabric'],
    data() {
        return {
            isDrawingLineMode: false,
            isArrow: false,
        }
    },
    created() {
        // 线条绘制
        this.drawHandler = initializeLineDrawing(this.canvas.c, defaultPosition);

        this.canvas.c.on('drop', (opt) => {
            // 画布元素距离浏览器左侧和顶部的距离
            const offset = {
                left: this.canvas.c.getSelectionElement().getBoundingClientRect().left,
                top: this.canvas.c.getSelectionElement().getBoundingClientRect().top,
            };

            // 鼠标坐标转换成画布的坐标（未经过缩放和平移的坐标）
            const point = {
                x: opt.e.x - offset.left,
                y: opt.e.y - offset.top,
            };

            // 转换后的坐标，restorePointerVpt 不受视窗变换的影响
            const pointerVpt = this.canvas.c.restorePointerVpt(point);
            dragOption.left = pointerVpt.x;
            dragOption.top = pointerVpt.y;
        });
    },
    methods: {
        // 拖拽开始时就记录当前打算创建的元素类型
        onDragend(type) {
            // todo 拖拽优化 this.canvas.editor.dragAddItem(event, item);
            switch (type) {
                case 'text':
                    this.addText(dragOption);
                    break;
                case 'textBox':
                    this.addTextBox(dragOption);
                    break;
                case 'rect':
                    this.addRect(dragOption);
                    break;
                case 'circle':
                    this.addCircle(dragOption);
                    break;
                case 'triangle':
                    this.addTriangle(dragOption);
                    break;
                case 'polygon':
                    this.addPolygon(dragOption);
                    break;
                default:
            }
        },
        addCircle(option) {
            const circle = new this.fabric.Circle({
                ...defaultPosition,
                ...option,
                radius: 150,
                stroke: "rgb(0,0,255)",
                strokeWidth: 1,
                fill: "rgba(255, 255, 255, 0)",
                id: uuid(),
                name: '圆形',
            });
            this.canvas.c.add(circle);
            if (!option) {
                circle.center();
            }
            this.canvas.c.setActiveObject(circle);
        },
        addRect(option) {
            const rect = new this.fabric.Rect({
                ...defaultPosition,
                ...option,
                stroke: "rgb(255,0,0)",
                strokeWidth: 1,
                fill: "rgba(255, 0, 0, 0)",
                width: 200,
                height: 200,
                id: uuid(),
                name: '矩形',
            });
            this.canvas.c.add(rect);
            if (!option) {
                rect.center();
            }
            this.canvas.c.setActiveObject(rect);
        },
        drawingLineModeSwitch(isArrow) {
            this.isArrow = isArrow;
            this.isDrawingLineMode = !this.isDrawingLineMode;
            this.drawHandler.setMode(this.isDrawingLineMode);
            this.drawHandler.setArrow(isArrow);
            this.canvas.c.forEachObject((obj) => {
                if (obj.id !== 'workspace') {
                    obj.selectable = !this.isDrawingLineMode;
                    obj.evented = !this.isDrawingLineMode;
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
.tool-box {
    display: flex;
    justify-content: space-around;

    span {
        flex: 1;
        text-align: center;
        padding: 5px 0;
        background: #f6f6f6;
        margin-left: 2px;
        cursor: pointer;

        &:hover {
            background: #edf9ff;

            svg {
                fill: #2d8cf0;
            }
        }
    }

    .bg {
        background: #d8d8d8;

        &:hover {
            svg {
                fill: #2d8cf0;
            }
        }
    }
}

.img {
    width: 20px;
}
</style>