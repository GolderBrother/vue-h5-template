import Vue from 'vue'
import Skeleton1 from './Skeleton/Skeleton1'
import Skeleton2 from './Skeleton/Skeleton2'
// 所谓的骨架屏，就是在页面内容未加载完成的时候，先使用一些图形进行占位，待内容加载完成之后再把它替换掉。在这个过程中用户会感知到内容正在逐渐加载并即将呈现，降低了“白屏”的不良体验。
export default new Vue({
  components: {
    // Skeleton1,
    Skeleton2
  },
  // <skeleton1 id="skeleton1"/>
  template: `
    <div>
      <skeleton2 id="skeleton2"/>
    </div>
  `
})
