import { inject, onBeforeMount, onMounted, reactive } from "vue";

/**
 * 画布数据仓库
 */
export default function useSelect(){
    const state = reactive({
        mSelectMode:'', //选择模式
        mSelectOneType:'', //单选模式
        mSelectId:'', //选择id
        mSelectIds :[], //选择id
        mSelectActive:[],
    })

    //依赖
    const fabric = inject('fabric')
    const canvas = inject('canvas')
    const event = inject('event')
    
    //单选
    const selectOne = (e)=>{
        state.mSelectMode = 'one';
        state.mSelectId = e[0].id;
        state.mSelectOneType = e[0].type;
        state.mSelectIds = e.map((item)=>item.id)
    }
    //多选
    const selectMulti = (e)=>{
        state.mSelectMode = 'multiple';
        state.mSelectId = '';
        state.mSelectIds = e.map((item) => item.id);
    }
    //选择取消
    const selectCancel = ()=>{
        state.mSelectId = ''
        state.mSelectIds = [];
        state.mSelectMode = ''
        state.mSelectOneType = '';
    }
    //渲染周期,注册事件
    onMounted(()=>{
        event.on('selectOne',selectOne)
        event.on('selectMultiple',selectMulti)
        event.on('selectCancel',selectCancel)
    })
    //解绑事件
    onBeforeMount(()=>{
        event.off('selectOne',selectOne);
        event.off('selectMultiple',selectMulti)
        event.off('selectCancel',selectCancel)
    })
    console.log(canvas);
    return {
        fabric,
        canvas,
        mixinState:state
    }
}