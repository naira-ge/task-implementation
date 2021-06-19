// Implement DOM renderer task
import el from './elFunction';

//Following test cases should pass:

/*//Test case 1.
el("div", {"class": "some_classname", "id": "some_id"},
    el("span", {}, 'hello')
  );

document.getElementById("root").appendChild(tree.draw());*/

/*Test case 2.
const tree = el("div", {},[
  el("ul", {}, [
    el("li", {}, ["Item 1"]),
    el("li", {}, ["Item 2"]),
    el("li", {}, ["Item 3"])
  ])]
);
document.getElementById("root").appendChild(tree.draw());
*/
//Test case 3.
const tree = el("form", {action: '/some_action'}, [
  el("label", {for: 'name'}, "First name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
  el("br", {}, null),
  el("label", {for: 'last_name'}, "Last name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
  el("br", {}, null),
  el("input", {type: 'submit', value: "Submit"}, null),
]);

document.getElementById("root").appendChild(tree.draw());
