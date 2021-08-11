# Tbinder
Simple and tiny library to bind your input values to another html elements innerHTML
First, add library to your project
```
<script src="tbinder.js"></script>
```
Let's say you have following html
```
<input id="name" placeholder="name"/>
<input id="item" placeholder="item"/>

<div id="my_target"></div>
```
To use first initialize it
```
var tbinder=new TBinder();
```
then set text
```
var txt="Hello {item}, I am {name}"
tbinder.set_text(txt)
```
then set the target(where the text should appear)
```
tbinder.set_target(document.getElementById('my_target'))
```
finally set the inputs from where the content should be loaded

```
tbinder.set_prop('item');
tbinder.set_prop('name');
```

at the end run it and it is done your inputs are bound now.

```
tbinder.run()
```
