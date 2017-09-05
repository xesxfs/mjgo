
module jbP2 {

    export class KeyManager {

        public static a;

        public static init() {
            var rfThis = this;
            document.onkeydown = function (evt) {
                rfThis.onkeydown(evt);
            }
            document.onkeyup = function (evt) {
                rfThis.onkeyup(evt);
            }
            this.dictKeyDn = {};
        }

        public static isDown( keycode:number ):boolean{
            return this.dictKeyDn[ keycode ] && this.dictKeyDn[ keycode ] == true;
        }

        private static onkeydown( evt ):void{
            var keycode = window.event ? evt.keyCode : evt.which;
            this.dictKeyDn[ keycode ] = true;
            
            //console.log("onkeydown code:"+keycode);
        }

        private static onkeyup( evt ):void{
            var keycode = window.event ? evt.keyCode : evt.which;
            this.dictKeyDn[ keycode ] = false;
        }

        public static Shift_L:number = 16;
        public static Ctrl_L:number = 17;
        public static Alt_L:number = 18;
        
        public static UP: number = 38;
        public static DOWN: number = 40;
        public static LEFT: number = 37;
        public static RIGHT: number = 39;

        public static W: number = 87;
        public static S: number = 83;
        public static A: number = 65;
        public static D: number = 68;
        
        public static SPACE: number = 32;
        
        private static dictKeyDn:Object;

    }

}