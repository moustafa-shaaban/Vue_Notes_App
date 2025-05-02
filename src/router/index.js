import { createRouter, createWebHistory, useRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/notes/NotesListPage.vue"),
    },
    {
      path: "/favorite/notes",
      name: "favorites",
      component: () => import("@/views/notes/FavoriteNotesPage.vue"),
    },
    {
      path: "/pinned/notes",
      name: "pinned",
      component: () => import("@/views/notes/PinnedNotesPage.vue"),
    },
    {
      path: '/create-note',
      name: 'create-note',
      component: () => import("@/views/notes/NoteFormPage.vue"),
    },
    {
      path: '/note-detail/:id',
      name: 'note-detail',
      component: () => import("@/views/notes/NoteDetailsPage.vue"),
    },
    {
      path: '/notes-by-tag/:id',
      name: 'notes-by-tag',
      component: () => import("@/views/notes/NotesByTagPage.vue"),
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import("@/views/tags/TagsListPage.vue"),
    },
    {
      path: '/create-tag',
      name: 'create-tag',
      component: () => import("@/views/tags/TagFormPage.vue"),
    },
    {
      path: '/tag-details/:id',
      name: 'tag-details',
      component: () => import("@/views/tags/TagDetailsPage.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
