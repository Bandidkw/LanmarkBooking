<template>
    <Rating :rating="4">
      <template #besideText>
          <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
        </template>
    </Rating>
</template>
<script setup>
import { Rating } from 'flowbite-vue'
</script>