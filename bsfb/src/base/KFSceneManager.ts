/**
 *
 * @author 
 *
 */

enum SceneName { Awake,Login,Hall,BSFB,LZTB,STONE,WXHH,DHS};
class KFSceneManager {
    
    protected runningScene:KFScene = null;
    
    protected mStage: eui.UILayer = null;
    
    private static instance: KFSceneManager;
    public static getInstance(stage?: eui.UILayer): KFSceneManager {
        if(this.instance == null) {
            this.instance = new KFSceneManager(stage);
        }
        return this.instance;
    }
    
    public constructor(stage: eui.UILayer) {
        this.mStage = stage;
	}
	
    public replaceScene(scene: SceneName){
        let newScene: KFScene = null;
        var name = SceneName[scene] +"Scene";
        var ctlclass = egret.getDefinitionByName(name);
        newScene = new ctlclass();
        this.mStage.addChild(newScene);
        if(this.runningScene!=null){
            this.runningScene.onDestroy();
            this.mStage.removeChild(this.runningScene);
        }
        
        this.runningScene = newScene;
        newScene.onAddToStage();
	}
	
    public getRunningScene(): KFScene{
	    return this.runningScene;
	}

    public getRuningSceneName():string{
        
        return egret.getQualifiedClassName(this.runningScene);
    }
}
