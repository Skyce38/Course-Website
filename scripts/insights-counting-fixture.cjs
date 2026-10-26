/* Independent P11-PROD-001 fixture; never seeded into the application. */
// Stack: LIFO B/2, ([)] mismatched, (5+(1+2)*4)-3=14, 4!=24, new C clears redo.
// KNN: unanimous Y is not measured test accuracy; two one-hot mismatches give 2+2=4;
// separate train/test; distance=hypot(5,.070), training proportion=99/105.
function fixture(){
 const response=(draft,rating=null)=>({draft,submitted:true,rating});
 const stackId='oop-python-stack',knnId='artificial-intelligence-final-knn';
 const stack=Object.fromEntries(Object.entries({'s-lifo':'b','s-brackets':'c','s-postfix':'14','s-factorial':'24','s-undo':'b'}).map(([id,v])=>[id,response(v)]));
 stack['s-explain']=response('อธิบาย postfix และป้องกัน underflow','revisit');
 const knn=Object.fromEntries(Object.entries({'k-vote':'a','k-encoding':'b','k-test':'c','k-distance':String(Math.hypot(5,.070)),'k-accuracy':String(99/105)}).map(([id,v])=>[id,response(v)]));
 knn['k-ties']=response('ระบุเกณฑ์ตัดสินระยะและคะแนนเสียงที่เสมอกัน','revisit');
 const a=structuredClone(stack),b=structuredClone(stack);a['s-lifo'].draft='a';b['s-lifo'].draft='a';b['s-postfix'].draft='13';knn['k-vote'].draft='b';knn['k-encoding'].draft='a';
 const stackState={version:1,revision:1,current:'s-lifo',review:[],responses:structuredClone(b),attempts:[{at:1700000000000,responses:a},{at:1700000001000,responses:b}],recorded:true};
 const knnState={version:1,revision:1,current:'k-vote',review:[],responses:knn,attempts:[],recorded:false};
 const stackKey='skyce-learning-practice-v1:'+stackId,knnKey='skyce-learning-practice-v1:'+knnId;
 return {stackId,knnId,stackKey,knnKey,stackState,knnState,values:{[stackKey]:JSON.stringify(stackState),[knnKey]:JSON.stringify(knnState)}};
}
module.exports={fixture};
