<template>
  <div id="app">
    <h3>Starbase Router</h3>
    <h4>
      <router-link class="link" to="/data/people">Meet the last people of the Earth</router-link> |
      <router-link class="link" to="/data/planets">The only planets in the universe</router-link>
    </h4>
    <router-view></router-view>
  </div>
</template>