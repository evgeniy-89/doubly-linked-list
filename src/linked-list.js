const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  append(data) {
    let node = new Node(data);
    if (!this.length) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this.length++;
    return this;
  }

  head() {
    return this.length ? this._head.data : null;
  }

  tail() {
    return this.length ? this._tail.data : null;
  }

  findNode(index) {
    let current = this._head;
    for (let i = 0; i < this.length; i++) {
      if (i !== index) {
        current = current.next;
      } else {
        return current;
      }
    }
  }

  at(index) {
    if (index > -1 && index < this.length) {
      if (!index) {
        return this._head.data;
      } else {
        if (index === this.length - 1) {
          return this._tail.data;
        } else {
          return this.findNode(index).data;
        }
      }
    } else {
      return -1;
    }
  }

  insertAt(index, data) {
    let node = new Node(data);

    if (!this.length) {
      this._head = node;
      this._tail = node;
      return this;
    }

    if (index > -1 && index < this.length) {
      if (!index) {
        this._head.prev = node;
        node.next = this._head;
        this._head = node;
      } else {
        if (index === this.length - 1) {
          this._tail.next = node;
          node.prev = this._tail;
          this._tail = node;
        } else {
          let target = this.findNode(index);
          target.prev.next = node;
          node.prev = target.prev.next;
          target.prev = node;
          node.next = target;
        }
      }
    }
    return this;
  }

  isEmpty() {
    return !this.length;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;
    return this;
  }

  deleteAt(index) {
    if (index > -1 && index < this.length) {
      if (!index) {
        if (this.length === 1) {
          this._head = null;
          this._tail = null;
          this.length--;
          return this;
        }
        this._head.next.prev = null;
        this._head = this._head.next;
      } else {
        if (index === this.length - 1) {
          this._tail.prev.next = null;
          this._tail = this._tail.prev;
        } else {
          let target = this.findNode(index);
          target.prev.next = target.next;
          target.next.prev = target.prev;
        }
      }
      this.length--;
      return this;
    }
    return -1;

  }

  reverse() {
    if (this.length <= 1) {
      return this;
    }

    let current = this._head;
    let next;
    this._head = this._tail;
    this._tail = current;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = current.prev;
      current.prev = next;
      current = next;
    }
    return this;
  }

  indexOf(data) {
    let current = this._head;

    for (let i = 0; i < this.length; i++) {
      if (current.data === data) {
        return i;
      }

      current = current.next;
    }

    return -1;
  }
}

module.exports = LinkedList;
