import { NoteItem, GroupedNotes } from "@/types/notes";

export function groupNotesByTypeAndParent(notes: NoteItem[]): GroupedNotes {
  return notes.reduce((acc, note) => {
    const type = note.type;
    const parentName = note.parentTopic.name;

    if (!acc[type]) {
      acc[type] = {};
    }
    if (!acc[type][parentName]) {
      acc[type][parentName] = [];
    }
    acc[type][parentName].push(note);

    return acc;
  }, {} as GroupedNotes);
}

export function formatTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}
