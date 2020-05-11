<template>
  <div class="skeletonsList">
    <div class="ant-list ant-list-vertical ant-list-lg ant-list-split">
      <div class="ant-spin-nested-loading">
        <div class="ant-spin-container">
          <ul class="ant-list-items">
            <li class="ant-list-item ant-list-item-no-flex">
              <div class="ant-skeleton ant-skeleton-with-avatar ant-skeleton-active">
                <div class="ant-skeleton-header">
                  <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle" />
                </div>
                <div class="ant-skeleton-content">
                  <h3 class="ant-skeleton-title" />
                  <ul class="ant-skeleton-paragraph">
                    <li />
                    <li />
                  </ul>
                </div>
              </div>
            </li>
            <li class="ant-list-item ant-list-item-no-flex">
              <div class="ant-skeleton ant-skeleton-with-avatar ant-skeleton-active">
                <div class="ant-skeleton-header">
                  <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle" />
                </div>
                <div class="ant-skeleton-content">
                  <h3 class="ant-skeleton-title" />
                  <ul class="ant-skeleton-paragraph">
                    <li />
                    <li />
                  </ul>
                </div>
              </div>
            </li>
            <li class="ant-list-item ant-list-item-no-flex">
              <div class="ant-skeleton ant-skeleton-with-avatar ant-skeleton-active">
                <div class="ant-skeleton-header">
                  <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle" />
                </div>
                <div class="ant-skeleton-content">
                  <h3 class="ant-skeleton-title" />
                  <ul class="ant-skeleton-paragraph">
                    <li />
                    <li />
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Skeleton2',
}
</script>
<style lang="scss" scoped>
@import url('~@/styles/lib/antd.scss');
.skeletonsList {
  margin-top: 5rem;
  padding: 1rem;
  .ant-skeleton-title {
    width: 50%;
  }
}
</style>
