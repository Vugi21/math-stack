// Loads every course from /content/courses/<course>/. Layout:
//   course.js                  {id, title, grade, blurb}
//   ch01/chapter.js            {id, n, title, blurb}
//   ch01/01-some-lesson.js     default export: lesson({...})
// Lessons appear in file-name order. To add a grade, add a folder with the same layout.
const courseFiles = import.meta.glob('/content/courses/*/course.js', { eager: true });
const chapterFiles = import.meta.glob('/content/courses/*/ch*/*.js', { eager: true });

export function loadCourses() {
  const courses = [];
  for (const [path, mod] of Object.entries(courseFiles).sort(([a], [b]) => a.localeCompare(b))) {
    const dir = path.replace('/course.js', '');
    const meta = mod.default;
    const chapters = [];
    const chapterDirs = new Set(Object.keys(chapterFiles).filter((f) => f.startsWith(dir + '/')).map((f) => f.split('/').slice(0, -1).join('/')));
    for (const cdir of [...chapterDirs].sort()) {
      const cmeta = chapterFiles[cdir + '/chapter.js']?.default;
      if (!cmeta) throw new Error('Missing chapter.js in ' + cdir);
      const lessons = Object.entries(chapterFiles)
        .filter(([f]) => f.startsWith(cdir + '/') && !f.endsWith('/chapter.js'))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([f, m]) => ({ ...m.default, file: f, chapterId: cmeta.id, courseId: meta.id }));
      chapters.push({ ...cmeta, lessons });
    }
    const lessons = chapters.flatMap((c) => c.lessons);
    const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]));
    const chapterById = Object.fromEntries(chapters.map((c) => [c.id, c]));
    lessons.forEach((l, i) => { l.index = i; l.chapter = chapterById[l.chapterId]; });
    chapters.forEach((c) => c.lessons.forEach((l, i) => { l.num = c.n + '.' + (i + 1); }));
    courses.push({ ...meta, chapters, lessons, lessonById, chapterById });
  }
  return courses;
}

export const courses = loadCourses().sort((a, b) => (a.grade || 0) - (b.grade || 0));
export const course = courses[0];
