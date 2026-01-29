import { Sidebar, MobileNav } from "@/components/Sidebar";
import { useLesson, useCompleteLesson } from "@/hooks/use-lessons";
import { useRoute } from "wouter";
import ReactMarkdown from "react-markdown";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function LessonDetail() {
  const [, params] = useRoute("/lessons/:slug");
  const slug = params?.slug || "";
  const { data: lesson, isLoading } = useLesson(slug);
  const { mutate: completeLesson, isPending } = useCompleteLesson();
  const { toast } = useToast();

  const handleComplete = () => {
    if (!lesson) return;
    completeLesson({ id: lesson.id }, {
      onSuccess: () => {
        toast({
          title: "Lesson Completed!",
          description: "You've earned XP. Keep going!",
          className: "border-l-4 border-l-success",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        {/* Header */}
        <div className="relative h-64 bg-secondary/30 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
           <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="text-[200px] font-bold font-display">{lesson.id}</span>
           </div>
           
           <div className="absolute bottom-0 left-0 p-8 z-20 max-w-4xl mx-auto w-full">
              <Link href="/lessons" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Lessons
              </Link>
              <h1 className="text-4xl font-bold font-display mb-2">{lesson.title}</h1>
              <div className="flex gap-4">
                 <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase">{lesson.difficulty}</span>
                 <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold uppercase">{lesson.category}</span>
              </div>
           </div>
        </div>

        <div className="max-w-4xl mx-auto p-8">
           <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-strong:text-foreground">
             <ReactMarkdown>{lesson.content}</ReactMarkdown>
           </div>

           <div className="mt-12 pt-8 border-t border-border flex justify-end">
             {lesson.isCompleted ? (
               <div className="flex items-center gap-2 text-success font-bold text-lg bg-success/10 px-6 py-3 rounded-xl">
                 <CheckCircle2 className="w-6 h-6" /> Completed
               </div>
             ) : (
               <button
                 onClick={handleComplete}
                 disabled={isPending}
                 className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
               >
                 {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : "Complete Lesson"}
               </button>
             )}
           </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
