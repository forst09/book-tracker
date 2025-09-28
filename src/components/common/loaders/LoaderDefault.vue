<template>
  <div :class="$style.loader">
    <div :class="$style.loader__book">
      <figure :class="$style.loader__page"></figure>
      <figure :class="$style.loader__page"></figure>
      <figure :class="$style.loader__page"></figure>
    </div>

    <span :class="$style.loader__text">Загрузка</span>
  </div>
</template>

<style lang="scss" module>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 51, 153, 0.4);
  z-index: 10;

  &__text {
    position: relative;
    font-size: 20px;
    text-align: center;
    color: #ffffff;

    &::after {
      position: absolute;
      content: '';
      -webkit-animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
      animation: Dots 2s cubic-bezier(0, 0.39, 1, 0.68) infinite;
    }
  }

  &__book {
    border: 4px solid #ffffff;
    width: 60px;
    height: 45px;
    position: relative;
    perspective: 150px;
    background-color: #663399;
  }

  &__page {
    display: block;
    width: 30px;
    height: 45px;
    border: 4px solid #ffffff;
    border-left: 1px solid #8455b2;
    margin: 0;
    position: absolute;
    right: -4px;
    top: -4px;
    overflow: hidden;
    background: #8455b2;
    transform-style: preserve-3d;
    -webkit-transform-origin: left center;
    transform-origin: left center;

    &:nth-child(1) {
      -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s infinite;
      animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.6s infinite;
    }

    &:nth-child(2) {
      -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s infinite;
      animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.45s infinite;
    }

    &:nth-child(3) {
      -webkit-animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s infinite;
      animation: pageTurn 1.2s cubic-bezier(0, 0.39, 1, 0.68) 1.2s infinite;
    }
  }
}

/* Page turn */

@-webkit-keyframes pageTurn {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  20% {
    background: #4b1e77;
  }
  40% {
    background: rebeccapurple;
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
  100% {
    background: rebeccapurple;
    -webkit-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
  }
}

@keyframes pageTurn {
  0% {
    transform: rotateY(0deg);
  }
  20% {
    background: #4b1e77;
  }
  40% {
    background: rebeccapurple;
    transform: rotateY(-180deg);
  }
  100% {
    background: rebeccapurple;
    transform: rotateY(-180deg);
  }
}

/* Dots */

@-webkit-keyframes Dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

@keyframes Dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}
</style>
