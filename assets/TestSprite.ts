// Copyright 2020 Cao Gaoting<caogtaa@gmail.com>
// https://caogtaa.github.io
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import TestAssembler from "./TestAssembler";

/*
 * Date: 2020-07-13 02:44:17
 * LastEditors: GT<caogtaa@gmail.com>
 * LastEditTime: 2020-07-22 14:03:32
*/ 


const {ccclass, property} = cc._decorator;

@ccclass
export default class TestSprite extends cc.Sprite {
    @property(cc.Vec2)
    set uv1Value(value: cc.Vec2) {
        this._uv1Value = value;
        this.FlushProperties();
    }
    get uv1Value() {
        return this._uv1Value;
    }

    @property(cc.Vec2)
    _uv1Value: cc.Vec2 = cc.Vec2.ONE;

    public FlushProperties() {
        //@ts-ignore
        let assembler: TestAssembler = this._assembler;
        if (!assembler)
            return;
            

        assembler.uv1Value = this._uv1Value;
        this.setVertsDirty();
    }

    onEnable () {
        super.onEnable();
        this.FlushProperties();
    }

    // // 使用cc.Sprite默认逻辑
    _resetAssembler() {
        this.setVertsDirty();
        let assembler = this._assembler = new TestAssembler();
        this.FlushProperties();

        assembler.init(this);

        //@ts-ignore
        this._updateColor();        // may be no need
    }
}
