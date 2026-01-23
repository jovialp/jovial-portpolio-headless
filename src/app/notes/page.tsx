import Notes from "@/components/notes/Notes";
import { fetchNotesPage } from "@/services/notes-page";

export default async function NotesPage() {
  const notesPageData = await fetchNotesPage();

  return <Notes data={notesPageData} />;
}
