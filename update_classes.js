const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USER/Desktop/Portfolio-main';

function addDarkClasses(fileName) {
  const filePath = path.join(dir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // text colors
  content = content.replace(/text-gray-900(?!\sdark:)/g, 'text-gray-900 dark:text-white');
  content = content.replace(/text-gray-800(?!\sdark:)/g, 'text-gray-800 dark:text-gray-200');
  content = content.replace(/text-gray-700(?!\sdark:)/g, 'text-gray-700 dark:text-gray-300');
  content = content.replace(/text-gray-600(?!\sdark:)/g, 'text-gray-600 dark:text-gray-400');
  content = content.replace(/text-gray-500(?!\sdark:)/g, 'text-gray-500 dark:text-gray-400');
  
  // borders
  content = content.replace(/border-gray-200(?!\sdark:)/g, 'border-gray-200 dark:border-slate-700/50');
  content = content.replace(/border-gray-100(?!\sdark:)/g, 'border-gray-100 dark:border-slate-800/50');
  
  // chips / tag backgrounds
  content = content.replace(/bg-indigo-100(?!\sdark:)/g, 'bg-indigo-100 dark:bg-indigo-900/40');
  content = content.replace(/bg-indigo-50(?!\sdark:)/g, 'bg-indigo-50 dark:bg-indigo-900/30');
  content = content.replace(/bg-blue-100(?!\sdark:)/g, 'bg-blue-100 dark:bg-blue-900/40');
  content = content.replace(/bg-green-100(?!\sdark:)/g, 'bg-green-100 dark:bg-green-900/40');
  content = content.replace(/bg-white(?!\/|\sdark:)/g, 'bg-white dark:bg-slate-900/50');
  
  // colored texts
  content = content.replace(/text-indigo-700(?!\sdark:)/g, 'text-indigo-700 dark:text-indigo-300');
  content = content.replace(/text-indigo-600(?!\sdark:)/g, 'text-indigo-600 dark:text-indigo-400');
  content = content.replace(/text-blue-700(?!\sdark:)/g, 'text-blue-700 dark:text-blue-300');
  content = content.replace(/text-blue-600(?!\sdark:)/g, 'text-blue-600 dark:text-blue-400');
  content = content.replace(/text-green-700(?!\sdark:)/g, 'text-green-700 dark:text-green-300');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

['app.js', 'blog.js', 'post.js'].forEach(addDarkClasses);
console.log('Done!');
