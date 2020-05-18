// name: GEvent.js
// project: Watcher
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-04-21 15:54
// ...

export default class GEvent {
    constructor () {
        this.__events__ = {}
    }
    /**
     * 开启属性监听
     */
    openPropertyWatch () {
        Object.prototype.addPropertyWatcher = this.__propertyWatcher;
        Object.prototype.removeWithWatcherTarget = this.__removeWithWatcherTarget;
        Object.prototype.removeWithPropertyName = this.__removeWithPropertyName;
    }
    /**
     * 属性监听者
     * 
     * 监听对象中的值为  基本数据类型  的属性值得变化
     * 
     * @param {*} property 属性名称
     * @param {*} callback 属性值发生变化的回调
     * @param {*} equal 是否在新旧值相等的时候执行回调
     */
    __propertyWatcher(property, callback, equal) {
        Object.defineProperty(this, 'addPropertyWatcher', {
            value: this['addPropertyWatcher']
        })
        Object.defineProperty(this, 'removeWithWatcherTarget', {
            value: this['removeWithWatcherTarget']
        })
        Object.defineProperty(this, 'removeWithPropertyName', {
            value: this['removeWithPropertyName']
        })
        let prefix = 'private_' + new Date().getTime() + '__' + Math.round(Math.random()*new Date().getTime()) + '_' + property + '_';
        this['__' + property + '__'] = this[property];
        Object.defineProperty(this, '__' + property + '__', {
            configurable: false,
            enumerable: false,
        })
        Object.defineProperty(this, property, {
            configurable: true,
            enumerable: true,
            set: function (value) {
                let old = this['__' + property + '__'];
                this['__' + property + '__'] = value;
                if ((old != value || equal) && this['__propertyWatchers__'][property]) {
                    for (let i = 0; i < this['__propertyWatchers__'][property].length; i++) {
                        let item = this['__propertyWatchers__'][property][i];
                        if (item && item != 'null') {
                            item(old, value)
                        }
                    }
                }
            },
            get: function () {
                return this['__' + property + '__']
            }
        })

        if (this['__propertyWatchers__']) {
                this['__propertyWatchers__'][property].push(callback)
        } else {
            this['__propertyWatchers__'] = {[property]: [callback]};
            Object.defineProperty(this, '__propertyWatchers__', {
                configurable: true,
                enumerable: false,
                value: this['__propertyWatchers__']
            })
        }

        return {
            name: property,
            index: this['__propertyWatchers__'][property].length - 1
        };
    }
    /**
     * 使用标记移除指定属性监听者
     * @param {*} target 监听者标记，由 addPropertyWatcher 生成
     * target 为空则移除所有
     */
    __removeWithWatcherTarget (target) {
        if (!target) {
            this['__propertyWatchers__'] = [];
            return;
        }
        if (this['__propertyWatchers__'] && this['__propertyWatchers__'][target.name]) {
            this['__propertyWatchers__'][target.name][target.index] = 'null';
        }
    }
    /**
     * 使用属性名移除属性监听者
     * 此方法会移除该属性名下所有监听者
     * @param {*} name 属性名
     * name 为空则移除 该对象 所有监听者
     */
    __removeWithPropertyName (name) {
        if (!name) {
            this['__propertyWatchers__'] = [];
            return;
        }
        if (this['__propertyWatchers__'] && this['__propertyWatchers__'][name]) {
            this['__propertyWatchers__'][name] = [];
        }
    }
    /**
     * 添加自定义事件
     * @param {*} name 事件名
     * @param {*} callback 事件触发时的回调
     */
    addEvent (name, callback) {
        if (this.__events__['__' + name + '__']) {
            this.__events__['__' + name + '__'].push(callback)
        } else {
            this.__events__['__' + name + '__'] = [callback]
        }
        return {
            name: name,
            index: this.__events__['__' + name + '__'].length - 1
        }
    }
    /**
     * 触发自定义事件
     * @param {*} name 要触发的事件名
     * @param {*} params 触发事件时携带的参数
     */
    emitEvent (name, params) {
        if (this.__events__['__' + name + '__']) {
            for (let i = 0; i < this.__events__['__' + name + '__'].length; i++) {
                let callback = this.__events__['__' + name + '__'][i];
                if (callback && callback != 'null') {
                    callback(params);
                }
            }
        }
    }
    /**
     * 使用事件名移除事件
     * 此方法会移除该 名称下所有事件
     * @param {*} name 事件名
     */
    removeWithEventName (name) {
        if (this.__events__['__' + name + '__']) {
            this.__events__['__' + name + '__'] = null;
        }
    }
    /**
     * 使用事件标记移除指定事件
     * @param {*} target 事件标记，由 addEvent 生成
     */
    removeWithEventTarget (target) {
        if (this.__events__['__' + target.name + '__'] && this.__events__['__' + target.name + '__'][target.index]) {
            this.__events__['__' + target.name + '__'][target.index] = 'null';
        }
    }
    /**
     * 移除所有事件
     */
    removeAll (){
        this.__events__ = {}
    }
}

