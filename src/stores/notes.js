import { ref, computed, readonly } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { uid } from "quasar";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: useStorage("notesStorage", []),
    tags: useStorage("tagsStorage", [
      {id: uid(), name: "Work"},
      {id: uid(), name: "Personal"},
      {id: uid(), name: "To-Do"},
      {id: uid(), name: "Important"},
      {id: uid(), name: "Projects"},
    ]),
    searchQuery: "",
  }),
  getters: {
    getNoteById: (state) => {
      return (id) => state.notes.find((note) => note.id === id);
    },
    getTagById: (state) => {
      return (id) => state.tags.find((tag) => tag.id === id);
    },
    getNotesByTag: (state) => {
      return (id) =>
        state.notes.filter((note) => {
          return note.tags.find((tag) => tag.id === id);
        });
    },
  },
  actions: {
    addNote(note) {
      this.notes.push(note);
    },

    updateNote(id, newNote) {
      const noteToEdit = this.notes.find((note) => note.id === id);
      noteToEdit.title = newNote.title;
      noteToEdit.content = newNote.content;

      console.log(noteToEdit.title);
    },

    // deleteNote(id) {
    //   const noteToDelete = this.notes.findIndex((note) => note.id === id);
    //   this.notes.splice(noteToDelete);
    // },

    deleteNote(id) {
      this.notes = this.notes.filter((note) => {
        return note.id !== id;
      })
    },

    togglePin(id) {
      const note = this.notes.find(n => n.id === id)
      if (note) {
        note.pinned = !note.pinned
      }
    },

    toggleFavorite(id) {
      const note = this.notes.find(n => n.id === id)
      if (note) {
        note.favorite = !note.favorite
      }
    },

    addTag(tag) {
      this.tags.push(tag);
    },

    updateTag(id, newTag) {
      const tagToEdit = this.tags.find((tag) => tag.id === id);
      tagToEdit.name = newTag.name;

      console.log(tagToEdit.name);
    },

    deleteTag(id) {
      this.notes.filter((note) => {
        note.tags.find((tag) => tag.id === id);

        note.tags = note.tags.filter((tag) => {
          return tag.id !== id;
        });
      });
      this.tags = this.tags.filter((tag) => {
        return tag.id !== id;
      });
    },
  },
});
