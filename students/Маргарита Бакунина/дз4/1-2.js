/*1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.*/


const str = "А: 'П', а. Учитель предупредил: 'Пишем диктант', открыл книгу и начал диктовать. А: 'П' — а. Учитель предупредил: 'Пишем диктант' — и открыл книгу. А: 'П!?…' — а. Учитель спросил: 'Готовы к диктанту?' — и обвел всех взглядом.";

str.replace(/^'|(\s)'|'(\,)|'(\s)|'$/g, '$1"$2');


