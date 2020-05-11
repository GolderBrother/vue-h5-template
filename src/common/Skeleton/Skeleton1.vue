<template>
  <div class="skeletonsDetail">
    <div class="ant-skeleton ant-skeleton-with-avatar ant-skeleton-active">
      <div class="ant-skeleton-header">
        <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle"></span>
      </div>
      <div class="ant-skeleton-content">
        <h3 class="ant-skeleton-title"></h3>
        <ul class="ant-skeleton-paragraph">
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Skeleton1',
}
</script>
<style lang="scss" scoped>
@import url('~@/styles/lib/antd.scss');
.skeletonsDetail {
  margin-top: 3rem;
  padding: 1rem;
  .ant-skeleton-title {
    width: 50%;
  }
}
</style>
