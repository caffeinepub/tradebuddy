import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, PlayCircle, Lightbulb } from 'lucide-react';
import { lessons, videos, tips } from '@/lib/mockData/learning';

export default function Learning() {
  const categories = ['Basics', 'Orders', 'Risk'];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Learning Center</h1>
          <p className="text-sm text-muted-foreground">Master trading at your own pace</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Lessons by Category */}
        {categories.map((category) => {
          const categoryLessons = lessons.filter((l) => l.category === category);
          if (categoryLessons.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-lg font-semibold mb-3">{category}</h2>
              <div className="space-y-3">
                {categoryLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={
                              lesson.difficulty === 'Beginner' ? 'default' :
                              lesson.difficulty === 'Intermediate' ? 'secondary' : 'outline'
                            }>
                              {lesson.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {/* Video Tutorials */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Video Tutorials</h2>
          <div className="grid grid-cols-1 gap-3">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 relative">
                      <PlayCircle className="w-8 h-8 text-primary" />
                      <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Watch now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-semibold">Quick Tips for Beginners</h2>
          </div>
          <div className="space-y-2">
            {tips.map((tip) => (
              <Card key={tip.id}>
                <CardContent className="p-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <p className="text-sm">{tip.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
