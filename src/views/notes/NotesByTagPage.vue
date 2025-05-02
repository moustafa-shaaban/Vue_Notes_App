<script setup>
import { computed } from 'vue';
import { date } from 'quasar';
import { useRoute } from 'vue-router';
import { useNotesStore } from '@/stores/notes';

const route = useRoute();

const notesStore = useNotesStore();

const notesList =  notesStore.getNotesByTag(route.params.id)
</script>


<template>
    <q-page class="flex flex-center column">
        <q-separator />
        <div v-if="notesList.length">
            <q-card v-for="note in notesList" :key="note.id" class="note-card q-mt-md" flat bordered>

                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{ note.title }}</div>
                            <div class="text-subtitle2">
                                {{ date.formatDate(note.createdAt, 'DD MMMM YYYY') }}
                                <q-badge clickable rounded color="primary" class="q-mx-xs" v-for="tag in note.tags">
                                    <q-breadcrumbs-el :label="tag.name"
                                        :to="{ name: 'tag-detail', params: { id: tag.id } }" />
                                </q-badge>
                            </div>
                        </div>

                        <div class="col-auto">
                            <q-btn color="grey-7" round flat icon="more_vert">
                                <q-menu cover auto-close>
                                    <q-list>
                                        <q-item clickable>
                                            <q-item-section color="negative">Remove Card</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section horizontal>
                    <q-card-section>
                        {{ note.content.substring(0, 200) }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn color="info" flat :to="{ name: 'note-detail', params: { id: note.id } }">Details</q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div v-else>
            <p>No Notes that has this tag Found, Click on the plus (+) sign to add a new note</p>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" :to="{ name: 'create-note' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<style lang="sass" scoped>
.search-input
  width: 100%
  max-width: 300px

.note-card
  width: 350px
</style>
