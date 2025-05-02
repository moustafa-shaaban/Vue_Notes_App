<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { Dialog, date, Notify } from "quasar";
import Multiselect from "vue-multiselect";

import { useNotesStore } from "@/stores/notes";


const notesStore = useNotesStore();
const route = useRoute();
const router = useRouter();

const isEditing = ref(false);

const note = ref({
    id: '',
    title: '',
    content: '',
    tags: [],
});

const noteTags = ref([]);

noteTags.value = notesStore.tags;

note.value = notesStore.getNoteById(route.params.id);

function handleSubmit() {
    try {
        notesStore.updateNote(route.params.id, note.value);
        isEditing.value = false;
        Notify.create({
            message: 'Note Updated Successfully',
            type: "positive",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
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

function confirm(id) {
    Dialog.create({
        dark: true,
        title: 'Confirm',
        color: 'primary',
        message: 'Are you sure you want to delete this note?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        try {
            notesStore.deleteNote(id)
            router.push('/');
            Notify.create({
                message: 'Note Deleted Successfully',
                type: "positive",
                actions: [
                    { icon: 'close', color: 'white', round: true, }
                ]
            })
        } catch (error) {
            Notify.create({
                message: error.message,
                type: "negative",
                actions: [
                    { icon: 'close', color: 'white', round: true, }
                ]
            })
        }
    })
};
</script>


<template>
    <q-page class="flex flex-center">
        <q-card v-if="isEditing" flat bordered class="my-card">
            <q-card-section class="row items-center q-pb-none q-mb-md" vertical>
                <div class="text-h6">Edit Note</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="handleSubmit">
                    <q-input filled v-model="note.title" label="Note Title" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Note Title is required']" />

                    <q-input filled v-model="note.content" type="textarea" required label="Note Content" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Note Content is required']" />

                    <div class="q-my-md"><label class="typo__label" v-if="notesStore.tags.length > 0">Tagging</label>
                        <multiselect 
                            class="q-my-md" 
                            v-model="note.tags" 
                            placeholder="Search" 
                            label="name"
                            track-by="name" 
                            :options="noteTags" 
                            :multiple="true" 
                            
                            :close-on-select="false" 
                            :clear-on-select="false"
                        >
                        </multiselect>
                    </div>

                    <q-separator />

                    <q-page-sticky position="bottom-right" :offset="[18, 18]">
                        <q-btn type="submit" fab icon="done" color="primary">
                        </q-btn>
                    </q-page-sticky>
                </q-form>
            </q-card-section>

            <q-page-sticky position="bottom-left" :offset="[18, 18]">
                <q-btn @click="isEditing = false" fab icon="undo" color="negative">
                </q-btn>
            </q-page-sticky>
        </q-card>


        <q-card v-else class="my-card q-mt-md" flat bordered>
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
                </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section horizontal>
                <q-card-section>
                    {{ note.content }}
                </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
                <q-btn color="primary" type="button" size="sm" @click="isEditing = true">Edit</q-btn>
                <q-btn color="negative" type="button" size="sm" @click="confirm(note.id)">Delete</q-btn>
            </q-card-actions>
        </q-card>

        <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn :to="{ 'name': 'home' }" fab icon="undo" color="negative">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>



<style lang="sass" scoped>
.my-card
  width: 100%
  width: 350px
</style>
