<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { nanoid } from 'nanoid';
import { Notify } from 'quasar';
import Multiselect from 'vue-multiselect'

import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();
const router = useRouter();

const noteTitle = ref("");
const noteContent = ref("");
const tags = ref([]);
const noteTags = ref([]);

noteTags.value = notesStore.tags;

function handleSubmit() {
  try {
    notesStore.addNote({
      id: nanoid(),
      title: noteTitle.value,
      content: noteContent.value,
      tags: tags.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    // Clear form fields
    noteTitle.value = '';
    noteContent.value = '';


    Notify.create({
      message: 'Note Added Successfully',
      type: "positive",
      actions: [
        { icon: 'close', color: 'white', round: true, }
      ]
    })
    router.push('/')
  } catch (error) {
    Notify.create({
      message: error.message,
      type: "negative",
      actions: [
        { icon: 'close', color: 'white', round: true, }
      ]
    })
  }
}
</script>

<template>
  <q-page class="flex flex-center column q-my-lg">
    <q-card flat bordered class="my-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 q-mb-md">Add Note</div>
        <q-space />
      </q-card-section>


      <q-card-section>
        <q-form @submit.prevent="handleSubmit">
          <q-input autocomplete filled v-model="noteTitle" label="Note Title" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Note Title is required']"  autofocus />

          <q-input filled v-model="noteContent" type="textarea" required label="Note Content" lazy-rules
            :rules="[val => val && val.length > 0 || 'Note Content is required']" />

          <q-separator />

          <div class="q-my-md" v-if="notesStore.tags.length > 0"><label class="typo__label">Tagging</label>
            <multiselect 
              class="q-my-md" 
              v-model="tags" 
              placeholder="Search" 
              label="name" 
              track-by="name"
              :options="noteTags" 
              :multiple="true" 
              :taggable="true"
              :close-on-select="true"
              :clear-on-select="false"
            >
            </multiselect>
          </div>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn type="submit" fab icon="done" color="primary">
            </q-btn>
          </q-page-sticky>

          <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn :to="{ 'name': 'home' }" fab icon="undo" color="negative">
            </q-btn>
          </q-page-sticky>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="sass">
.my-card
  width: 100%
  max-width: 400px

.q-dark div,
.body--dark div
  .multiselect__tags
    background-color: rgb(24, 26, 27)
    color: white
  .multiselect__input
    background-color: rgb(24, 26, 27)
    color: white
  .multiselect__content-wrapper
      background-color: rgb(24, 26, 27)
      color: white
  .multiselect__placeholder
    color: white
</style>
