# Tbinder [In Development]
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

**Listst**

Say you have multiple inputs that should appear as list

```
<input class="product" placeholder="product 1 ">
<input class="productPrice" placeholder="product 1 price">

<input class="product" placeholder="product 2 ">
<input class="productPrice" placeholder="product 2 price">
```

You should add the same class to this elements, and then you can call `set_array` function like this
```
tbinder2.set_array('products', '{product}  costs {productPrice}');
```
where 'products' is placeholder in your text(that should be wrapped in [] ) and elements inside {} are class names of that elements.
of course you should point out where this should appear like this
```
var txt="Here is our shopping list :[products]"
tbinder.set_text(txt)
```
The items will be separated with commas

**Decorators**
Decorators determine how your input should be changed before it appers on the text.
Currently, there are 2 decorators availabe, which you can pass as a second parameter to set_prop function.
They are 'date' and 'ucfirst'.
```
 tbinder2.set_prop('birth_date', 'date');
 ```
 when date decorator is passed like this it will transform your date input(which by default will have yyyy-mm-dd) format to dd.mm.yyyy format.
 And ucfirst decorator will just capilatize the string. For example tashkent => Tashkent, TASHKENT=>Tashkent
```
tbinder2.set_prop('city', 'ucfirst');
```
Custom decorator functionality will be added soon.
