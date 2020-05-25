<script>
  import {onMount, createEventDispatcher} from 'svelte';

  import * as store from '../store';
  import {TagButton} from '../design-system';
  import {removeElement} from '../util';

  export let tags = [];
  export let supportedTags = [];

  const dispatch = createEventDispatcher();

  const toggleTag = tag => {
    tags = removeElement(tags, tag);
    dispatch('change');
  };
</script>

<div class="tag-filters-box">
    {#each supportedTags as tag}
      <TagButton activeClass={tags.indexOf(tag) > -1 ? 'active': ''}
                 on:click={() => toggleTag(tag)}>
          {tag}
      </TagButton>
    {/each}
</div>

<style>
  a {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    border: 1px solid black;
  }

  a:hover {
    text-decoration: none;
  }

  :global(.active) {
    background-color: cornflowerblue !important;
    color: white;
  }
  div :global(button) {
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>