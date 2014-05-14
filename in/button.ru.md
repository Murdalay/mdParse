#button  

Блок **button** используется для создания различных типов кнопок и предоставляет возможность изменять их размер, состояние, содержимое и внешний вид.  

В MSIE8 и ниже [link](url) кастомные кнопки деградируют до  кнопок `<button>`, кнопка-ссылка станет нативной ссылкой `<a>`.






## Варианты использования кнопок

Блок **button** служит для создания различных типов кнопок:

<table>
  <tr>
    <th>Тип</th>
    <th>Описание</th>
    <th>Пример</th>
  </tr>
  <tr>
    <td>Обычная кнопка</td>
    <td>Применяется для любых кнопок веб-интерфейса; используется по умолчанию.</td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 'm' },
        icon : { block : 'icon', mods : { action : 'download' } }
    }
    </td>
   <tr>
    <td>Кнопка-ссылка</td>
    <td>Разновидность обычной кнопки, для которой дополнительно задан атрибут `url`.  
Применяется для перехода по ссылке.</td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 'm', type : 'link' },
        url : '#',
        text : 'link'
    }
    </td>
   </tr>
   <tr>
    <td>Кнопка действия</td>
    <td>Предназначена для отправки данных на сервер (submit). Всегда располагается в форме.  
    Чтобы кнопка стала кнопкой действия, во входном BEMJSON блока необходимо добавить модификатор `type` со значением `submit`.
    </td>
    <td>
    {
        tag: 'form',
        content: {
            block : 'button',
            mods : { theme : 'normal', type : 'submit', size : 'm' },
            text : 'button'
        }
    }
    </td>
   </tr>
</table>

## Допустимые атрибуты блока
Допустимые атрибуты блока задаются в одноименных полях входного BEMJSON блока:

<table>
  <tr>
    <th>Атрибут</th>
    <th>Тип</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td>text</td>
    <td>`string`</td>
    <td>Текст кнопки</td>
   </tr>
   <tr>
    <td>icon</td>
    <td>`bemjson`</td>
    <td>Блок `icon`, формирующий иконку.</td>
  </tr>
  <tr>
    <td>url</td>
    <td>`string`</td>
    <td>Адрес ссылки. Если указан, то кнопка становится ссылкой `<a>`, а значение `url` атрибутом `href`.</td>
  </tr>
  <tr>
    <td>action</td>
    <td>`boolean`</td>
    <td>Визуально выделяет кнопку на странице.</td>
  </tr>
  <tr>
    <td></td>
    <td>`string`</td>
    <td> </td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  </table>


## Модификаторы блока

### Темы блока `_theme`

Блок представлен в следующих темах:

 * simple   
 * normal  

Без указания [темы](http://ya.ru) к блоку применяются значения по умолчанию (*default*), установленные браузером. 

Наглядно видно на примерах ниже:

#### default
````bemjson
    {
        block : 'button', 
        text : 'default' 
    }
````
#### simple

````bemjson
    {
        block : 'button',
        mods : { theme : 'simple' },
        text : 'simple'
    } 
```` 
#### normal

````bemjson
    {
        block : 'button',
        mods : { theme : 'normal', size : m },
        text : 'normal'
    }
```` 

### Размеры кнопок `_size`

Задает размер всем типам кнопок. Обязательный модификатор. 

Реализован только в теме *normal*.

Доступно четыре размера реализации блока: **s**, **m**, **l**, **xl**.

<table>
  <tr>
    <th>Параметры/Размер</th>
    <th>s</th>
    <th>m</th>
    <th>l</th>
    <th>xl</th>
  </tr>
  <tr>
    <td>Размер шрифта</td>
    <td>13px</td>
    <td>13px</td>
    <td>15px</td>
    <td>18px</td>
  </tr>
  <tr>
    <td>Высота кнопки</td>
    <td>24px</td>
    <td>28px</td>
    <td>32px</td>
    <td>38px</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 's' },
        text : 'Small'
    }
    </td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 'm' },
        text : 'Medium'
    }
    </td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 'l' },
        text : 'Large'
    }
    </td>
    <td>
    {
        block : 'button',
        mods : { theme : 'normal', size : 'xl' },
        text : 'X-large'
    }
    </td>
  </tr>
</table>


### Типы блока `_type`

Блок представлен следующими типами: 

* кнопка-ссылка (`_link`).  
* [dsdsd](http://blah.ru) атрибут `url`. Кнопка [получает](http://yada.ru) тег `<a>`, а значение `url` становится атрибутомом `href`. 
* кнопка действия (`_submit`).  
Обязательно располагается в форме.    


Реализован во всех темах блока:

<table>
  <tr>
    <th>Тип / Тема</th>
    <th>default</th>
    <th>simple</th>
    <th>normal</th>
  </tr>
  <tr>
    <td> `_link`</td>
    <td>
    {
        block : 'button',
        mods : { type : 'link' },
        url : '#',
        text : 'link'
    }
    </td>
    <td>
    {
        block : 'button',
        mods : { theme : 'simple', type : 'link' },
        url : '#',
        text : 'link'
    }
    </td>
    <td>       
    {
        block : 'button',
        mods : { theme : 'normal', type : 'link' },
        url : '#',
        text : 'link'
    }
  </td>
  </tr>
  <tr>
  <td>`_submit`</td>
  <td>
  {
      tag: 'form',
      content: {
          block : 'button',
          mods : { type : 'submit' },
          text : 'default'
      }
  }
  </td>
  <td>
  {
      tag: 'form',
      content: {
          block : 'button',
          mods : { theme : 'simple', type : 'submit' },
          text : 'simple'
      }
  }
  </td>
  <td>
  {
      tag: 'form',
      content: {
          block : 'button',
          mods : { theme : 'normal', size : 'm', type : 'submit' },
          text : 'normal'
      }
  }
  </td>
</table>

### Состония блока 

#### Не активна `_disabled_true`
   
В состоянии "не активна" кнопка [видна](http://yaysays.com), но недоступна для действий пользователя.  

Такая кнопка не может получить фокус путем нажатия на клавишу `Tab`, мышью или другими способами. 

Реализован во всех темах блока.

<table>
  <tr>
    <th>default</th>
    <th>simple</th>
    <th>normal</th>
  </tr>
  <tr>
    <td>
    {
        block : 'button',
        text : '_disabled_true',
        mods : { disabled : true }
    }
    </td>
    <td>
    {
        block : 'button',
        text : '_disabled_true',
        mods : { theme : 'simple', disabled : true }
    }
    </td>
    <td>       
    {
        block : 'button',
        text : '_disabled_true',
        mods : { theme : 'normal', size : 'm', disabled : true }
    }
  </td>
  </tr>
</table>
    
#### В фокусе `_focused_true`

В состоянии блока `focused` со значением `true` кнопка всегда находится в фокусе. Нажатие по ней можно выполнить клавишей `Space` или `Enter`. Переход по контролам формы [осуществляется](http://sasf) клавишей `Tab`.

Реализован во всех темах блока.

````
    {
        block : 'button',
        text : '_focused_true',
        mods : { 
            theme : 'normal', 
            size : 'm', 
            focused : true 
        }
    } 
````

#### Наведение курсором `_hovered_true`

Определяет действие "наведение курсором" на кнопку.

Реализован во всех темах блока.

<table>
  <tr>
    <th>default</th>
    <th>simple</th>
    <th>normal</th>
  </tr>
  <tr>
    <td>
    {
        block : 'button',
        text : '_hovered_true',
        mods : { hovered : true }
    }
    </td>
    <td>
    {
        block : 'button',
        text : '_hovered_true',
        mods : { theme : 'simple', hovered : true }
    }
    </td>
    <td>       
    {
        block : 'button',
        text : '_hovered_true',
        mods : { theme : 'normal', size : 'm', hovered : true }
    }
  </td>
  </tr>
</table>

#### Нажатие `_pressed_true`

Определяет состояние "нажатия на кнопку" (действие).

Реализован во всех темах блока.

<table>
  <tr>
    <th>default</th>
    <th>simple</th>
    <th>normal</th>
  </tr>
  <tr>
    <td>
    {
        block : 'button',
        text : '_pressed_true',
        mods : { pressed : true }
    }
    </td>
    <td>
    {
        block : 'button',
        text : '_pressed_true',
        mods : { theme : 'simple', pressed : true }
    }
    </td>
    <td>       
    {
        block : 'button',
        text : '_pressed_true',
        mods : { theme : 'normal', size : 'm', pressed : true }
    }
  </td>
  </tr>
</table>

#### Залипание `_togglable_true`

Определяет состояние кнопки в нажатом состоянии, когда первый клик по кнопке нажимает ее, а второй возвращает в исходное состояние.


<table>
  <tr>
    <th>default</th>
    <th>simple</th>
    <th>normal</th>
  </tr>
  <tr>
    <td>
    {
        block : 'button',
        text : '_togglable_true',
        mods : { togglable : true }
    }
    </td>
    <td>
    {
        block : 'button',
        text : '_togglable_true',
        mods : { theme : 'simple', togglable : true }
    }
    </td>
    <td>       
    {
        block : 'button',
        text : '_togglable_true',
        mods : { theme : 'normal', size : 'm', togglable : true }
    }
  </td>
  </tr>
</table>


## Элементы блока

Визуально представлен следующими элементами:


### __text

