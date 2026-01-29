import { Sidebar, MobileNav } from "@/components/Sidebar";
import { useLessons } from "@/hooks/use-lessons";
import { Loader2, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Lessons() {
  const { data: lessons, isLoading } = useLessons();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        <header className="px-8 py-6 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
          <h1 className="text-2xl font-bold font-display">Trading Academy</h1>
          <p className="text-muted-foreground">Master the markets one lesson at a time.</p>
        </header>

        <div className="p-8">
          {isLoading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons?.map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer group h-full flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-secondary to-background relative overflow-hidden p-6 flex items-center justify-center">
                       <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                       <BookOpen className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors transform group-hover:scale-110 duration-300" />
                       
                       {lesson.isCompleted && (
                         <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                           <CheckCircle className="w-3 h-3" /> Completed
                         </div>
                       )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-xs font-bold text-primary uppercase tracking-wider">{lesson.difficulty}</span>
                         <span className="text-xs text-muted-foreground">{lesson.category}</span>
                      </div>
                      <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        Learn the fundamentals of {lesson.title.toLowerCase()} trading strategies...
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                        <span className="text-sm font-medium">Start Lesson</span>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
