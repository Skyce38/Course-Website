"""Original, reproducible SVG diagrams; raster export reuses Phase 14's Chrome/Pillow approach.
Authoring only: Python standard library. Run from any directory; no website runtime dependency.
"""
from pathlib import Path
from fractions import Fraction as F
import html, json, math

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/diagrams/ai-oop'
INK, MUTED, BLUE, TEAL, RED = '#172b3a', '#526273', '#146c96', '#08776f', '#a53838'
SOFT, LINE = '#f2f6f8', '#6b7e8d'
items = []


class Draw:
    def __init__(self, course, lesson, section, name, title, explanation, source, reference, assumptions, model):
        number = len(items) + 1
        self.d = dict(number=number, id='visual15-'+name, name='visual15-'+name, course=course,
                      lesson=lesson, resourceId=course+'-'+lesson, section=section, purpose=title.replace('|', ' '),
                      alt=explanation.replace('[','(').replace(']',')'), caption='ภาพเขียนเสริม: '+title.replace('|', ' ')+' — '+assumptions,
                      explanation=explanation, source=source, reference=reference, assumptions=assumptions,
                      verification='Independent model checks plus original SVG topology/label review; see check-ai-oop-visual-models.py',
                      copyright='Original programmatic artwork; no copied slide/textbook artwork. Linked lesson attribution retained.',
                      review='PASS: scoped model, SVG topology, detailed raster and rendered-reader review; docs/ai-oop-final-visuals.md', model=model, width=1120, logicalWidth=560, bodyFont=32)
        items.append(self.d)
        self.s, self.y = [], 120+48*len(title.split('|'))
        self.text(28, 38, 'STUDY / '+('AI' if course=='artificial-intelligence' else 'OOP')+' '+str(number).zfill(2), 26, BLUE)
        for i, line in enumerate(title.split('|')): self.text(28, 90+48*i, line, 36, weight=700)

    def text(self, x, y, text, size=32, color=INK, anchor='start', weight=400):
        self.s.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{html.escape(str(text))}</text>')

    def rect(self, x, y, w, h, fill=SOFT, stroke='#d0dbe2', rx=10):
        self.s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')

    def line(self, points, color=LINE, arrow=False, dash=False, edge=None):
        marker='inherit' if arrow=='inherit' else 'arrow'
        self.s.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+'" fill="none" stroke="'+color+'" stroke-width="3"'+(' marker-end="url(#'+marker+')"' if arrow else '')+(' stroke-dasharray="8 6"' if dash else '')+(' data-edge="'+html.escape(edge)+'"' if edge else '')+'/>')

    def ownership(self, points, kind, edge):
        self.s.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+'" fill="none" stroke="'+LINE+'" stroke-width="3" marker-start="url(#'+kind+')" data-edge="'+edge+'"/>')

    def card(self, lines, color=INK, fill=SOFT):
        y, h = self.y, 32+44*len(lines)
        self.s.append('<g data-card="true">')
        self.rect(28, y, 504, h, fill)
        for i, line in enumerate(lines): self.text(280, y+43+i*44, line, 32, color, 'middle', 600 if i==0 else 400)
        self.s.append('</g>')
        self.y += h+28

    def flow(self, blocks):
        for i, block in enumerate(blocks):
            if i: self.line([(280,self.y-24),(280,self.y-4)], BLUE, arrow=True)
            self.card(block)

    def row(self, values, label=None, colors=None):
        if label: self.text(28,self.y+28,label,32,weight=600); self.y+=48
        width=504/len(values)
        for i, value in enumerate(values):
            self.rect(28+i*width,self.y,width-3,62,fill=colors[i] if colors else SOFT)
            self.text(28+(i+.5)*width,self.y+42,value,32,anchor='middle')
        self.y+=86

    def node(self, x, y, label, id=None, color=BLUE, width=160):
        self.s.append('<g'+(' data-node="'+html.escape(id)+'"' if id else '')+'>')
        lines=label if isinstance(label,list) else [label]
        self.rect(x,y,width,24+44*len(lines),'#ffffff',color)
        for i,line in enumerate(lines):self.text(x+width/2,y+44+44*i,line,32,anchor='middle',weight=600)
        self.s.append('</g>')

    def matrix(self, rows, label, highlight=None):
        self.text(28,self.y+28,label,32,weight=600);self.y+=48
        size=min(90,504/len(rows[0])); start=(560-size*len(rows[0]))/2
        for i,row in enumerate(rows):
            for j,value in enumerate(row):
                self.rect(start+j*size,self.y+i*size,size-3,size-3,'#e4f2ef' if highlight and (i,j) in highlight else SOFT,rx=3)
                self.text(start+(j+.5)*size,self.y+(i+.63)*size,value,32,anchor='middle')
        self.y+=len(rows)*size+30

    def finish(self):
        height=math.ceil(self.y+56)
        self.text(28,height-25,'ภาพอธิบายเสริม • ดูเงื่อนไขในคำบรรยาย',24,MUTED)
        d=self.d;d['height']=height*2
        d['file']='courses/'+d['course']+'/summaries/images/'+d['name']+'.webp'
        d['svg']='docs/diagrams/ai-oop/'+d['name']+'.svg'
        markers=f'<marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto-start-reverse"><path d="M0 0L9 4.5L0 9" fill="{LINE}"/></marker><marker id="inherit" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto"><path d="M0 0L11 6L0 12Z" fill="#fff" stroke="{LINE}" stroke-width="1"/></marker>'
        for kind,fill in [('aggregation','#fff'),('composition',LINE)]:markers+=f'<marker id="{kind}" markerWidth="12" markerHeight="12" refX="0" refY="6" orient="auto"><path d="M0 6L6 0L12 6L6 12Z" fill="{fill}" stroke="{LINE}" stroke-width="1"/></marker>'
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="{height*2}" viewBox="0 0 560 {height}" role="img" aria-labelledby="title desc" lang="th"><title id="title">{html.escape(d["purpose"])}</title><desc id="desc">{html.escape(d["alt"])}</desc><defs>{markers}</defs><rect width="560" height="{height}" fill="#fff"/><g font-family="Leelawadee UI, Noto Sans Thai, sans-serif" stroke-linecap="round" stroke-linejoin="round">'+''.join(self.s)+'</g></svg>\n'
        (OUT/(d['name']+'.svg')).write_text(svg,encoding='utf-8',newline='\n')


AI='artificial-intelligence'
OOP='oop-python'
REF={
 'agents':'https://aima.cs.berkeley.edu/',
 'search':'https://aima.cs.berkeley.edu/',
 'regression':'https://scikit-learn.org/1.7/modules/linear_model.html#ordinary-least-squares',
 'knn':'https://scikit-learn.org/1.7/modules/neighbors.html',
 'nb':'https://scikit-learn.org/1.7/modules/naive_bayes.html',
 'tree':'https://scikit-learn.org/1.7/modules/tree.html#mathematical-formulation',
 'linkage':'https://docs.scipy.org/doc/scipy-1.16.0/reference/generated/scipy.cluster.hierarchy.linkage.html',
 'kmeans':'https://scikit-learn.org/1.7/modules/clustering.html#k-means',
 'backprop':'https://cs231n.github.io/optimization-2/',
 'cnn':'https://cs231n.github.io/convolutional-networks/',
 'python':'https://docs.python.org/3.12/tutorial/classes.html',
 'abc':'https://docs.python.org/3.12/library/abc.html',
 'sort':'https://docs.python.org/3.12/howto/sorting.html',
 'collections':'https://docs.python.org/3.12/library/collections.html',
 'hash':'https://docs.python.org/3.12/glossary.html#term-hashable',
 'uml':'https://www.omg.org/spec/UML/2.5.1'
}


def ai(lesson,section,name,title,explanation,source,ref,assumptions,model):
    return Draw(AI,lesson,section,name,title,explanation,source,REF[ref],assumptions,model)


def oop(lesson,section,name,title,explanation,source,ref,assumptions,model):
    return Draw(OOP,lesson,section,name,title,explanation,source,REF[ref],assumptions,model)


def make_ai():
    a=ai('ai-foundations-agents','agents','agent-cycle','รับรู้ แล้วกระทำ|เป็นวงจรในสิ่งแวดล้อม','สิ่งแวดล้อมส่ง percepts ผ่าน sensors ให้ Agent; Agent ส่ง actions ผ่าน actuators กลับสู่สิ่งแวดล้อม แล้วรับข้อมูลรอบใหม่ เป้าหมายเป็นเกณฑ์เลือก ไม่ใช่ percept และการเรียนรู้ออนไลน์ไม่ใช่เงื่อนไขบังคับ','Current lesson #agents; S01 physical pp.11–13; existing coverage ledger','agents','แนวคิด ไม่อ้างผลทดลองหรือระบบควบคุมจริง',{'kind':'agent-cycle','edges':['environment:agent','agent:environment']})
    y=a.y;a.node(100,y,'สิ่งแวดล้อม','environment',width=360);a.node(100,y+240,'Agent','agent',width=360)
    a.line([(120,y+68),(120,y+240)],BLUE,True,edge='environment:agent');a.text(150,y+125,'Percepts',32,BLUE);a.text(150,y+167,'ผ่าน Sensors',32)
    a.line([(440,y+240),(440,y+68)],TEAL,True,edge='agent:environment');a.text(280,y+225,'Actions ↑',32,TEAL)
    a.y=y+350;a.card(['Actions ผ่าน Actuators','เป้าหมาย ≠ สิ่งรับรู้']);a.card(['รับ Percepts รอบใหม่','ไม่จบหลังทำ Action ครั้งเดียว']);a.finish()
    a=ai('ai-foundations-agents','ai-ml','ai-subsets','AI, ML และ DL|ขอบเขตที่ซ้อนกัน','กรอบ AI ครอบ ML และกรอบ ML ครอบ Deep Learning: BFS เป็นตัวอย่าง AI ที่ไม่ต้องเรียนจากข้อมูล; KNN เป็น ML ที่ไม่ใช่ deep neural network; deep CNN อยู่ใน DL ขนาดกรอบไม่ได้แทนสถิติหรือประสิทธิภาพ','Current lesson #ai-ml; S01 physical p.14; authored examples already in current overview','agents','ขนาดกรอบไม่ใช่สัดส่วนเชิงสถิติ',{'kind':'subsets','sets':['AI','ML','DL']})
    y=a.y;a.rect(28,y,504,420,'#f2f6f8',BLUE);a.text(55,y+47,'AI',36,BLUE,weight=700);a.text(55,y+91,'เช่น BFS / กฎที่ออกแบบไว้',30)
    a.rect(70,y+122,420,270,'#e9f2f6',TEAL);a.text(96,y+165,'ML',36,TEAL,weight=700);a.text(96,y+208,'เช่น KNN',32)
    a.rect(112,y+240,336,122,'#fff',BLUE);a.text(140,y+283,'Deep Learning',32,BLUE,weight=600);a.text(140,y+326,'เช่น deep CNN',32);a.y=y+450;a.card(['เป็น Agent ไม่บังคับใช้ ML','เป็น ML ไม่จำเป็นต้องเป็น DL']);a.finish()
    graph={'S':['A','B'],'A':['C'],'B':['G'],'C':['D'],'D':['S','G'],'G':[]}
    a=ai('search-models-bfs-dfs','example-graph','search-directed','กราฟกำหนดทิศทาง|อ่านเพื่อนบ้านตาม tuple','กราฟตัวอย่างที่ผู้เขียนบทสร้างมี S→A,B; A→C; B→G; C→D; D→S,G และ G ไม่มีลูก ต้องคงวงจร D→S แต่ข้ามสถานะที่เคยค้นพบแล้วในการค้นหาแบบกราฟ ไม่วาดขอบย้อนทุกเส้นเอง','Current lesson #example-graph and #python-search; authored graph, not a traced slide figure','search','ทุกขอบ cost=1; S: A ก่อน B; D: S ก่อน G',{'kind':'search-graph','graph':graph})
    y=a.y;positions={'S':(190,y),'A':(48,y+150),'B':(350,y+150),'C':(48,y+300),'D':(48,y+450),'G':(350,y+450)}
    for n,(x,yy) in positions.items():a.node(x,yy,n,n,width=100)
    for u,v in [('S','A'),('S','B'),('A','C'),('B','G'),('C','D')]:
        x1,y1=positions[u];x2,y2=positions[v];a.line([(x1+50,y1+68),(x2+50,y2)],BLUE,True,edge=u+':'+v)
    a.line([(148,y+484),(350,y+484)],BLUE,True,edge='D:G')
    a.line([(48,y+484),(15,y+484),(15,y+34),(190,y+34)],TEAL,True,True,'D:S')
    a.y=y+560;a.card(['D → S ยังอยู่ในกราฟ','discovered ช่วยกันการวนซ้ำ']);a.finish()
    a=ai('search-models-bfs-dfs','bfs-trace','bfs-dfs-frontier','BFS กับ DFS|Visit ไม่ใช่ Path','BFS dequeue ตามลำดับ S A B C G แต่เส้นทางคำตอบ S B G มีสองขอบ; DFS แบบ frame ตาม tuple เข้า S A C D G และคำตอบมีสี่ขอบ ขณะ BFS จบยังมี D ใน queue จึงห้ามใช้ discovered แทน visit','Current lesson #bfs-trace / #dfs-trace; exact authored graph and stop convention','search','BFS ตรวจ goal เมื่อ dequeue; DFS ใช้ frame',{'kind':'search-trace','bfs':['S','A','B','C','G'],'dfs':['S','A','C','D','G'],'paths':[['S','B','G'],['S','A','C','D','G']]})
    a.row(['S','A','B','C','G'],'BFS • Visit เมื่อ dequeue');a.card(['คำตอบ S → B → G','2 ขอบ • ตื้นที่สุดในกราฟนี้']);a.row(['S','A','C','D','G'],'DFS • เข้า frame ตาม tuple');a.card(['คำตอบ S → A → C → D → G','4 ขอบ • ไม่รับรองสั้นที่สุด']);a.card(['BFS หยุดแล้ว Q ยังมี D','Discovered ≠ Visit ≠ Path']);a.finish()
    xs=[8,9,7,6,13,7,11,12];ys=[35,49,27,33,60,21,45,51];slope=F(1703,375);intercept=-F(493,375)
    a=ai('final-regression','least-squares','regression-residual','เส้น OLS กับ Residual|วัดแนวตั้งที่ x เดิม','จุดแปดต้นจาก S06 ใช้ x=เส้นผ่านศูนย์กลางและ y=ความสูงในหน่วยเดิมที่ไม่ระบุชื่อ เส้น OLS ที่ผู้เขียนบทคำนวณเพิ่มมี slope 1703/375 และ intercept −493/375; เส้นตั้งที่ x=9 เชื่อมค่าทำนาย 39.557333 กับค่าจริง 49 ไม่ใช่ระยะตั้งฉากกับเส้น','Current lesson #tree-correlation / #least-squares / #prediction; S06 physical pp.7–8 and13; authored OLS extension','regression','fit ทั้ง 8 จุดพร้อม intercept; ไม่อ้างเหตุและผล',{'kind':'regression','x':xs,'y':ys,'slope':str(slope),'intercept':str(intercept),'residualIndex':1})
    y=a.y+30;px=lambda x:85+(x-5)*47;py=lambda v:y+340-(v-15)*6
    a.line([(85,y),(85,y+340),(510,y+340)]);a.text(32,y+14,'y',32);a.text(503,y+384,'x',32)
    for v in [20,40,60]:a.text(72,py(v)+10,v,28,anchor='end')
    for x in [6,9,13]:a.text(px(x),y+377,x,28,anchor='middle')
    a.line([(px(6),py(float(intercept+slope*6))),(px(13),py(float(intercept+slope*13)))],BLUE)
    for x,v in zip(xs,ys):a.s.append(f'<circle cx="{px(x)}" cy="{py(v)}" r="7" fill="{TEAL}"/>')
    a.line([(px(9),py(49)),(px(9),py(float(intercept+slope*9)))],RED)
    a.y=y+420;a.card(['ŷ = −1.314667 + 4.541333x','ที่ x=9: ŷ=39.557333']);a.card(['y=49 → e=y−ŷ=9.442667','Residual ใช้ x เดียวกัน']);a.finish()
    a=ai('final-regression','errors','regression-error-metrics','Error หักล้างได้|แต่ความคลาดเคลื่อนไม่หาย','ตัวอย่าง X07 sheet err มี actual [2,2,0] และ predicted [2,0,2] จึง residual [0,2,−2] ผลรวมเป็นศูนย์แต่ absolute รวม 4 และ squared รวม 8: MAE=4/3 MSE=8/3 และ RMSE=√(8/3) ไม่เติมหน่วยที่แหล่งไม่ได้ระบุ','Current lesson #errors; X07 err!A2:E9; independently recalculated','regression','หาร n=3; residual=actual−predicted',{'kind':'errors','actual':[2,2,0],'predicted':[2,0,2],'mae':'4/3','mse':'8/3'})
    a.row([2,2,0],'Actual');a.row([2,0,2],'Predicted');a.row([0,2,'−2'],'Residual • e');a.row([0,2,2],'ค่าสัมบูรณ์ • |e|');a.row([0,4,4],'กำลังสอง • e²');a.card(['MAE = 4/3 ≈ 1.333333','MSE = 8/3 ≈ 2.666667','RMSE ≈ 1.632993']);a.finish()
    a=ai('final-knn','buy-encoding','knn-one-hot','เปลี่ยนหนึ่งหมวดหมู่|One-hot ต่างสองช่อง','Buy ใช้ full one-hot โดย Type เรียง Sport,General: query General คือ [0,1] แต่ R1 Sport คือ [1,0] จึงต่างสองช่องและเพิ่ม d²=2 ไม่ใช่ 1 ส่วน feature blocks อื่นเหมือนกัน ตัวเลขรหัส ordinal ของ Drug เป็นคนละ representation','Current lesson #buy-encoding; X03 KNN G:O and C01; no coordinates inferred from slide art','knn','ใช้ full one-hot ไม่ drop คอลัมน์; ไม่ scale',{'kind':'one-hot','query':[0,1],'row':[1,0],'squaredDistance':2})
    a.row(['Sport','General'],'บล็อก Type ของ Buy');a.row([0,1],'Query • General');a.row([1,0],'R1 • Sport');a.row(['1','1'],'ผลต่างกำลังสองแต่ละช่อง');a.card(['d² = (1−0)² + (0−1)² = 2','d = √2 ≈ 1.414214']);a.card(['ต่าง m หมวด → d²=2m','เฉพาะ full one-hot ชุดนี้']);a.finish()
    ranks=[8,10,4,3,2];dist=[5.000490,7.213252,8.063355,11.090537,11.090624];labels=['drugC','drugY','drugX','drugC','drugC']
    a=ai('final-knn','drug-worked','knn-neighbors','เพื่อนบ้านห้าตัว|โหวตจากอันดับ ไม่ใช่ทุกแถว','Drug ใช้ query และ encoding ตาม X04 โดยไม่ scale: อันดับห้าแรก R8,R10,R4,R3,R2 ให้ labels drugC,drugY,drugX,drugC,drugC จึงเลือก drugC ด้วย 3 เสียง ระยะในภาพปัดหลังจัดอันดับ ไม่สลับ R3/R2 และไม่อ้างผลทางการแพทย์','Current lesson #drug-worked; X04 rows2–11/query13; S07 R8 sex discrepancy retained in lesson','knn','k=5; Euclidean 7 มิติของ X04; แถวเดิมแก้ tie',{'kind':'knn','rank':ranks,'distances':dist,'labels':labels,'k':5})
    a.card(['X04 • ไม่ปรับสเกล','Query อายุ 36 / Sex F']);
    for rank,r,d,label in zip(range(1,6),ranks,dist,labels):
        y=a.y;a.rect(28,y,504,98,'#e9f4f0' if label=='drugC' else SOFT);a.text(44,y+38,str(rank)+'. R'+str(r)+'  '+label,32,TEAL if label=='drugC' else INK,weight=600);a.text(44,y+78,'d = '+f'{d:.6f}',32);a.y+=120
    a.row([3,1,1],'เสียง: C / Y / X');a.card(['ทำนาย drugC','ไม่ใช่ผลความแม่นยำทั่วไป']);a.finish()
    a=ai('final-naive-bayes','judy-calculation','nb-judy','จาก Prior × Likelihood|สู่ Posterior ของ Judy','Judy ใช้ Blonde/Average/Heavy/No และไม่ smooth: prior +3/8 กับ −5/8 คูณ conditional likelihoods ได้ scores 1/18 และ 1/125 แล้วหารผลรวม 143/2250 จึง posterior +125/143 และ −18/143 ค่าที่ normalize เป็นโมเดล ไม่ใช่ความถี่ร่วมที่สังเกต','Current lesson #judy-counts / #judy-calculation; S07 physical p.7; normalized values authored','nb','Categorical; α=0; conditional independence',{'kind':'nb-judy','counts':[3,5],'plus':['2/3','2/3','1/3','3/3'],'minus':['2/5','1/5','2/5','2/5'],'scores':['1/18','1/125'],'posterior':['125/143','18/143']})
    a.card(['Query Judy','Blonde / Average / Heavy / No']);a.card(['+ : prior 3/8','× 2/3 × 2/3 × 1/3 × 3/3','score = 1/18']);a.card(['− : prior 5/8','× 2/5 × 1/5 × 2/5 × 2/5','score = 1/125'])
    a.card(['Z = 1/18 + 1/125 = 143/2250','+ : 125/143 ≈ 0.874126','− : 18/143 ≈ 0.125874']);a.finish()
    a=ai('final-naive-bayes','smoothing','nb-smoothing','Zero count กับ Smoothing|เป็นคนละแบบจำลอง','Buy มี Y=N=5 และ category counts [2,2,2,3]; raw Red ใน N มี count ศูนย์จึง scoreN=0 แต่ alpha=1 ใช้ตัวหาร [7,7,7,8] และ prior ยัง 1/2 ทำให้ scores225/5488 และ30/5488 แล้ว posterior Y=15/17 ไม่ใช่1','Current lesson #buy-raw / #smoothing; X01/X03 counts; explicit CategoricalNB settings','nb','คง prior class-frequency; ไม่ใช้ Gaussian density',{'kind':'nb-smoothing','classCount':5,'categories':[2,2,2,3],'alpha':1,'scores':['225/5488','30/5488'],'posterior':['15/17','2/17']})
    a.row([2,2,2,3],'Kj ของแต่ละ feature');a.row([7,7,7,8],'ตัวหาร Nc + αKj (α=1)');a.card(['Raw • α=0','P(Red | N)=0 → score N=0','Posterior Y=1 ในโมเดลนี้']);a.card(['Laplace • α=1','sY=225/5488; sN=30/5488','Posterior Y=15/17, N=2/17']);a.card(['Posterior ไม่ใช่ Accuracy','ทั้งสองแบบยังเลือก Y']);a.finish()
    a=ai('final-decision-tree','sunburn','tree-entropy','แยก HairColor|ต้องถ่วงขนาดแต่ละกิ่ง','Sunburn parent มี +3/−5 รวม8และ entropy0.954434bit; HairColor แบ่ง blonde(+2/−2)4แถว red(+1)1แถว brown(−3)3แถว จึง weighted entropy4/8×1+1/8×0+3/8×0=0.5 และ gain0.454434 ไม่เฉลี่ย entropy เท่ากันทั้งสามกิ่ง','Current lesson #sunburn; S08 physical pp.6,13–14; independently recalculated counts/gain','tree','log ฐาน2; 0 log 0 ใช้ลิมิตเป็น0',{'kind':'entropy','parent':[3,5],'children':[[2,2],[1,0],[0,3]],'entropy':.9544340029249649,'weighted':.5,'gain':.45443400292496494})
    a.card(['Parent: +3 / −5','H = 0.954434 bit']);
    for title,counts in [('Blonde',(2,2)),('Red',(1,0)),('Brown',(0,3))]:
        a.text(28,a.y+28,title+' • +'+str(counts[0])+' / −'+str(counts[1]),32,weight=600);a.y+=48
        for i in range(sum(counts)):a.rect(28+i*54,a.y,48,36,'#dceee7' if i<counts[0] else '#edf0f4',TEAL if i<counts[0] else LINE)
        a.y+=64
    a.card(['H หลังแบ่ง = (4/8)×1 = 0.5','IG = 0.954434 − 0.5','= 0.454434 bit']);a.finish()
    a=ai('final-decision-tree','rules','tree-sunburn','เดินตามกิ่ง|หนึ่ง Path คือเงื่อนไข AND','ต้นไม้ Sunburn ใช้ HairColor เป็น root: redให้+ brownให้− ส่วน blonde ต้องตรวจ Lotion ต่อโดย noให้+ และyesให้− เส้นทาง blonde AND Lotion=no จึงให้+ และไม่ต้องตรวจ attribute ที่ไม่มีใน path ไม่อ้างเป็นกฎทางการแพทย์สากล','Current lesson #sunburn / #rules; S08 physical pp.8–9,16–17','tree','ต้นไม้ fit ชุด Sunburn; ไม่ใช่ test accuracy',{'kind':'decision-tree','edges':['hair:red','hair:lotion','hair:brown','lotion:no','lotion:yes']})
    y=a.y;a.node(180,y,'HairColor','hair',width=200)
    for id,label,x in [('red',['Red','+'],28),('lotion','Lotion',208),('brown',['Brown','−'],388)]:
        a.node(x,y+175,label,id,width=144);a.line([(280,y+68),(x+72,y+175)],BLUE,True,edge='hair:'+id)
    a.text(280,y+136,'Blonde',30,anchor='middle');
    for id,label,x in [('no','No → +',100),('yes','Yes → −',320)]:a.node(x,y+350,label,id,width=150);a.line([(280,y+243),(x+75,y+350)],TEAL,True,edge='lotion:'+id)
    a.y=y+460;a.card(['Blonde AND Lotion=No → +','กฎนี้อิงชุดข้อมูล ไม่ใช่กฎสากล']);a.finish()
    matrix=[[0,2,6,10,9],[2,0,3,9,8],[6,3,0,7,5],[10,9,7,0,4],[9,8,5,4,0]]
    a=ai('final-hierarchical-clustering','worked','single-dendrogram','Dendrogram แบบ Single|ความสูงคือระยะ Linkage','จาก matrix หมายเลข1–5 หน้า22 รวม1กับ2ที่ระยะ2 แล้วรวม3ที่3; รวม4กับ5ที่4 และรวมสองกลุ่มที่5 เส้นตัด4.5จึงเหลือ{1,2,3}กับ{4,5} ตามกฎรวม height≤threshold ตำแหน่งแนวนอนไม่ได้แทนระยะ','Current lesson #worked / #dendrogram; S09 physical pp.22–26; not the different p.14 matrix','linkage','Single=min ของ cross-pairs; ไม่ใช่ probability',{'kind':'single-linkage','matrix':matrix,'heights':[2,3,4,5],'cut':4.5})
    y=a.y;bottom=y+360;points={1:(80,bottom),2:(180,bottom),3:(280,bottom),4:(380,bottom),5:(480,bottom)}
    a.text(28,y+14,'ระยะ Linkage',30,weight=600)
    a.line([(48,y+40),(48,bottom)])
    for h in [2,3,4,5]:a.text(35,bottom-60*h+10,h,28,anchor='end')
    def merge(left,right,height,key):
        x1,y1=points[left];x2,y2=points[right];yy=bottom-60*height
        a.line([(x1,y1),(x1,yy),(x2,yy),(x2,y2)],BLUE,edge=key);points[key]=((x1+x2)/2,yy)
    merge(1,2,2,'12');merge('12',3,3,'123');merge(4,5,4,'45');merge('123','45',5,'all')
    a.line([(57,bottom-270),(520,bottom-270)],RED,dash=True);a.text(518,bottom-278,'cut 4.5',27,RED,anchor='end')
    for n in range(1,6):a.text(points[n][0],bottom+42,n,32,anchor='middle')
    a.y=bottom+85;a.card(['ตัดที่ 4.5 → 2 กลุ่ม','{1,2,3} และ {4,5}']);a.finish()
    a=ai('final-hierarchical-clustering','linkage','linkage-cross-pairs','ระยะระหว่างกลุ่ม|ไม่ใช่ระหว่าง Centroid','หลังรวม{1,2} ระยะไป3ใน matrix เดิมคือ6และ3 จึง single=min=3 complete=max=6 average=(6+3)/2=4.5 ส่วน average รอบสุดท้ายของ{1,2,3}กับ{4,5}ต้องเฉลี่ย cross-pairs ทั้งหกคือ10,9,9,8,7,5 ไม่ให้น้ำหนักกลุ่มย่อยเท่ากันโดยไม่ดูสมาชิก','Current lesson #linkage / #worked; S09 pp.19–22; complete/average extensions authored','linkage','ใช้ matrix หน้า22เดิม; Average ทุก cross-pair',{'kind':'cross-pairs','pair':[6,3],'finalPairs':[10,9,9,8,7,5],'single':3,'complete':6,'average':4.5,'finalAverage':8})
    a.row([6,3],'{1,2} ไป {3} • ระยะคู่สมาชิก');a.card(['Single → min(6,3) = 3','Complete → max(6,3) = 6','Average → (6+3)/2 = 4.5']);a.row([10,9,9,8,7,5],'{1,2,3} ไป {4,5} • 3×2 คู่');a.card(['Average รอบสุดท้าย','48 / 6 = 8','ไม่ใช่ระยะของจุดศูนย์กลาง']);a.finish()
    pts=[(2,10),(2,5),(8,4),(5,8),(7,5),(6,4),(1,2),(4,9)];centers=[(2,10),(5,8),(1,2)];labels=[0,2,1,1,1,1,2,1]
    a=ai('final-kmeans','x05','kmeans-assign','Assign ก่อน Update|ใช้ Centroid เก่าพร้อมกัน','X05 มีแปดจุดและ seeds(2,10),(5,8),(1,2): รอบแรกสมาชิก C1={1}, C2={3,4,5,6,8}, C3={2,7}; จุด2(2,5)มี d²=[25,18,10]จึง C3 ไม่ใช้ศูนย์กลางที่อัปเดตแล้วกับบางจุดในรอบเดียว','Current lesson #x05; X05 Sheet1!B1:C3 and rows6–13; not A02 customer data','kmeans','Euclidean; tie เลือกเลขกลุ่มต่ำ; ไม่ scale',{'kind':'kmeans','points':pts,'centers':centers,'labels':labels,'updated':[[2,10],[6,6],[1.5,3.5]]})
    y=a.y+10;bottom=y+400;px=lambda x:70+x*46;py=lambda v:bottom-v*34;colors=[BLUE,TEAL,RED]
    a.line([(70,y+10),(70,bottom),(510,bottom)]);a.text(25,y+22,'y',32);a.text(505,bottom+38,'x',32)
    for value in [2,5,10]:a.text(59,py(value)+9,value,26,anchor='end')
    for value in [2,5,8]:a.text(px(value),bottom+38,value,28,anchor='middle')
    for i,(point,label) in enumerate(zip(pts,labels),1):
        x,yy=px(point[0]),py(point[1]);a.s.append(f'<circle cx="{x}" cy="{yy}" r="8" fill="{colors[label]}"/>');a.text(x+13,yy-10,i,30,colors[label])
    for i,(center,color) in enumerate(zip(centers,colors),1):
        x,yy=px(center[0]),py(center[1]);a.line([(x-12,yy-12),(x+12,yy+12)],color);a.line([(x-12,yy+12),(x+12,yy-12)],color);a.text(x+20,yy+39,'C'+str(i),28,color)
    a.y=bottom+75;a.card(['× = Centroid ก่อน Update','C1 (2,10): จุด1','C2 (5,8): จุด3,4,5,6,8','C3 (1,2): จุด2,7']);a.row([25,18,10],'จุด 2 • d² ไป C1 / C2 / C3');a.card(['จุด 2 → C3','ไม่มีหน่วยใน X05; ไม่ใช้หน่วย A02']);a.finish()
    a=ai('final-kmeans','x05','kmeans-update','Update คือค่าเฉลี่ย|ไม่ใช่จุดข้อมูลที่ใกล้สุด','เมื่อ assign รอบ1ของ X05 เสร็จจึง update: C2สมาชิก3,4,5,6,8มีผลรวมพิกัด(30,30)หาร5ได้(6,6), C1คง(2,10), C3จุด2และ7ได้(1.5,3.5) SSEหลังupdateรอบนี้=37 ไม่ปะปนกับ43/3ของรอบสุดท้าย','Current lesson #x05 first iteration; exact X05 data and post-update SSE convention','kmeans','SSE ใช้ศูนย์กลางหลัง Update รอบ1เท่านั้น',{'kind':'kmeans-update','members':[3,4,5,6,8],'sum':[30,30],'count':5,'center':[6,6],'sse':37})
    a.flow([['C2 ก่อน Update = (5,8)','สมาชิก: 3, 4, 5, 6, 8'],['รวมพิกัดสมาชิก','Σx=30 และ Σy=30'],['หารจำนวนสมาชิก 5','C2 ใหม่ = (6,6)']]);a.card(['C1 ใหม่ = (2,10)','C3 ใหม่ = (1.5,3.5)','SSE หลัง Update = 37']);a.finish()
    a=ai('final-perceptron','perceptron','perceptron-neuron','Weighted Sum กับ Bias|ต้องประกาศ Threshold','Perceptron ของ X06 ใช้ z=b+w1x1+w2x2 และให้y=1เฉพาะz>0; ที่z=0ให้0 ตาม strict convention ของบท ไม่สลับกับbipolar±1หรือsigmoid และไม่ตีความlearning rateเป็นaccuracy','Current lesson #ann / #perceptron; S10 pp.2–14; X06 binary strict convention','backprop','X06: y=1 เมื่อ z>0; z=0 ให้0',{'kind':'perceptron','weights':[.1,.1,.1],'x':[0,0],'strict':True,'z':.1,'y':1})
    y=a.y;a.node(28,y,'x1=0','x1',width=160);a.node(28,y+120,'x2=0','x2',width=160);a.node(322,y+60,'Σ + bias','sum',width=210)
    a.line([(188,y+34),(322,y+94)],BLUE,True,edge='x1:sum');a.line([(188,y+154),(322,y+94)],BLUE,True,edge='x2:sum');a.text(208,y+24,'w1=.1',28);a.text(208,y+197,'w2=.1',28)
    a.y=y+240;a.flow([['z = 0.1 + 0.1(0) + 0.1(0)','= 0.1'],['z>0 → y=1','ถ้า z=0 → y=0']]);a.card(['Bias คือ input คงที่ 1','ไม่ใช่ feature ที่ลืมปรับได้']);a.finish()
    a=ai('final-perceptron','and','perceptron-update','อัปเดต X06 แถวแรก|x เป็นศูนย์ แต่ Bias ยังเปลี่ยน','X06 เริ่ม(w0,w1,w2)=(0.1,0.1,0.1) α=0.5 แถวAND00target0ได้z0.1,y1,error−1 จึงΔw=αe[1,0,0]=[−0.5,0,0]และน้ำหนักใหม่(−0.4,0.1,0.1) ตัวอย่างนี้เป็นแถวแรกไม่ใช่ผลฝึกทั้งepoch','Current lesson #and; X06 Sheet1!B1,G3:I4; no L01 run inferred','backprop','Sequential; error=t−y; bias input=1',{'kind':'perceptron-update','before':[.1,.1,.1],'rate':.5,'x':[0,0],'target':0,'output':1,'after':[-.4,.1,.1]})
    a.row(['0.1','0.1','0.1'],'ก่อน: w0 / w1 / w2');a.card(['x=(0,0), t=0, z=0.1','y=1 → e=t−y=−1']);a.row([1,0,0],'Input ที่รวม Bias');a.row(['−0.5',0,0],'Δw = 0.5 × (−1) × [1,0,0]');a.row(['−0.4','0.1','0.1'],'หลัง: w0 / w1 / w2');a.finish()
    theta=[.1,.2,.1,-.3,.4,-.2,.7,-.5,.1]
    a=ai('final-backpropagation','worked','backprop-forward','Forward ผ่าน Sigmoid|คำนวณด้วย Weights เก่า','ตัวอย่างผู้เขียนใช้ x=(1,0.5),target0.8: z1=0.3,z2=−0.3 ผ่านsigmoidได้h1=0.574442517,h2=0.425557483 แล้วzo=0.7h1−0.5h2+0.1=0.289331020 จึงy=0.571832348และhalf-squared loss0.026030239 ไม่ใช่threshold XOR network','Current lesson #worked; authored numerical extension to S10 pp.21–24','backprop','2–2–1 sigmoid; L=½(y−t)²; ไม่ใช่ XOR weights',{'kind':'backprop-forward','theta':theta,'x':[1,.5],'target':.8,'h':[.574442517,.425557483],'output':.571832348,'loss':.026030239})
    y=a.y;a.node(105,y,'x = (1, 0.5)','input',width=350)
    a.node(28,y+170,'z1 = 0.3','h1',width=230);a.node(302,y+170,'z2 = −0.3','h2',width=230)
    a.line([(280,y+68),(143,y+170)],BLUE,True,edge='input:h1');a.line([(280,y+68),(417,y+170)],BLUE,True,edge='input:h2')
    a.text(143,y+284,'h1=0.574443',32,anchor='middle');a.text(417,y+284,'h2=0.425557',32,anchor='middle')
    a.node(105,y+390,'zo = 0.289331','out',width=350);a.line([(143,y+300),(280,y+390)],TEAL,True,edge='h1:out');a.line([(417,y+300),(280,y+390)],TEAL,True,edge='h2:out')
    a.y=y+500;a.card(['y = σ(zo) = 0.571832348','t=0.8 → L=0.026030239']);a.finish()
    a=ai('final-backpropagation','backprop','backprop-gradient','Backward คือ Chain Rule|Update หลังเก็บ Gradient ครบ','จากตัวอย่างเดิม go=(y−t)y(1−y)=−0.055864594; hidden ใช้ output weightsเก่าv1=0.7,v2=−0.5 จึงg1=−0.009559595,g2=0.006828282 แล้วใช้θnew=θold−0.2gradientพร้อมกันทุกตัว bias outputใหม่0.111172919 ไม่เปลี่ยนvก่อนหาhidden gradient','Current lesson #backprop / #worked; S10 p.24 opposite delta/plus-update convention already reconciled','backprop','Gradient g=∂L/∂z; ใช้ v เก่าทั้งสองกิ่ง',{'kind':'backprop-gradient','theta':theta,'x':[1,.5],'target':.8,'rate':.2,'go':-.055864594,'hidden':[-.009559595,.006828282],'biasNew':.111172919})
    a.card(['go=(y−t)y(1−y)','= −0.055864594']);y=a.y
    for x,label,val,id in [(28,'v1 เก่า = 0.7','g1=−0.009559595','g1'),(302,'v2 เก่า = −0.5','g2=0.006828282','g2')]:
        a.line([(280,y-30),(x+115,y+50)],BLUE,True,edge='go:'+id);a.node(x,y+65,label,id,width=230);a.text(x+115,y+180,val.split('=')[0],32,anchor='middle');a.text(x+115,y+225,val.split('=')[1],32,anchor='middle')
    a.y=y+270;a.card(['gj = hj(1−hj) vj go','เก็บทุก Gradient จาก θ เดิม']);a.flow([['θ ใหม่ = θ เก่า − 0.2g','Bias output: 0.111172919'],['Forward ด้วยทุกค่าใหม่','L ใหม่ = 0.025035809']]);a.finish()
    a=ai('final-deep-learning-overview','rnn','rnn-unrolled','RNN กับลำดับข้อมูล|ใช้ Parameters ร่วมตามเวลา','ตัวอย่างmany-to-oneที่บทเขียนเพิ่มมีinput3tokenและoutputsentimentเดียว hidden stateส่งจากh1ไปh2ไปh3และทุกเวลามีW,U,bร่วมกัน ไม่ได้สร้างparametersอิสระใหม่ทุกtoken ภาพเป็นโครงสร้างแนวคิด ไม่ใช่ผลฝึกหรือการรับรองความจำไม่จำกัด','Current lesson #rnn; S11 physical pp.7–8; authored three-token mapping','backprop','ภาพแนวคิด; ไม่กำหนด loss หรือจำนวน epochs',{'kind':'rnn','steps':3,'edges':['x1:h1','x2:h2','x3:h3','h1:h2','h2:h3','h3:label']})
    y=a.y
    for i,x in enumerate([28,210,392],1):
        a.node(x,y,'x'+str(i),'x'+str(i),width=140);a.node(x,y+170,'h'+str(i),'h'+str(i),width=140);a.line([(x+70,y+68),(x+70,y+170)],BLUE,True,edge='x'+str(i)+':h'+str(i))
        if i<3:a.line([(x+140,y+204),(x+182,y+204)],TEAL,True,edge='h'+str(i)+':h'+str(i+1))
    a.node(322,y+350,'หนึ่ง Label','label',width=210);a.line([(462,y+238),(427,y+350)],BLUE,True,edge='h3:label')
    a.y=y+470;a.card(['hₜ=f(Wxₜ+Uhₜ₋₁+b)','W, U, b ชุดเดียวทุกเวลา']);a.card(['3 Inputs → 1 Output','Many-to-one เช่น Sentiment']);a.finish()
    a=ai('final-deep-learning-overview','gan','gan-roles','GAN แยกสองบทบาท|Generator กับ Discriminator','Noiseเข้าGeneratorเพื่อสร้างตัวอย่าง ส่วนDiscriminatorรับทั้งข้อมูลจริงและข้อมูลสร้างเพื่อแยกreal/fake ระหว่างtraining สัญญาณreal/fakeมาจากแหล่งตัวอย่าง แม้ไม่ได้ใช้human class labelsภายนอก ไม่ใช่ภาพโมเดลที่ฝึกสำเร็จแล้วและไม่ได้รับประกันว่าทุกstyle transferใช้GAN','Current lesson #gan / #style; S11 physical pp.9–11; conceptual role diagram only','backprop','แสดงทางข้อมูลระหว่าง Train ไม่ใช่ผลทดลอง',{'kind':'gan','edges':['noise:G','G:fake','fake:D','real:D']})
    y=a.y
    a.node(28,y,'Noise','noise',width=220);a.node(28,y+140,'Generator','G',width=220);a.node(28,y+280,'ข้อมูลสร้าง','fake',width=220);a.node(312,y+280,'ข้อมูลจริง','real',width=220)
    a.line([(138,y+68),(138,y+140)],BLUE,True,edge='noise:G');a.line([(138,y+208),(138,y+280)],BLUE,True,edge='G:fake');a.node(105,y+480,'Discriminator','D',width=350)
    a.line([(138,y+348),(280,y+480)],TEAL,True,edge='fake:D');a.line([(422,y+348),(280,y+480)],TEAL,True,edge='real:D')
    a.y=y+600;a.card(['D แยก Real / Fake','G สร้าง ไม่ได้ตัดสิน Real / Fake']);a.finish()
    x=[[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]];kernel=[[9,8,7],[6,5,4],[3,2,1]]
    a=ai('final-cnn','kernel','cnn-no-flip','เลื่อน Kernel โดยไม่กลับ|Cross-correlation ช่องแรก','ตัวอย่างหน้า16ใช้input4×4และkernel[9,8,7;6,5,4;3,2,1] ไม่กลับkernel แล้วรวมเก้าผลคูณได้228 ส่วน312เป็นผลเมื่อกลับkernel180องศา ไม่ใช่sumเดิม ในภาพนี้stride1 padding0 bias0 จึงได้output2×2','Current lesson #kernel; S11 physical p.16 discrepancy already corrected in lesson','cnn','ไม่กลับ Kernel; stride1, padding0, bias0',{'kind':'cnn-correlation','input':x,'kernel':kernel,'output':[[228,408],[273,453]]})
    a.matrix(x,'Input 4×4',[(i,j) for i in range(3) for j in range(3)]);a.matrix(kernel,'Kernel 3×3 • ไม่กลับ');a.card(['9+40+63+12+30+40+9+14+11','= 228 (ช่องแรก)']);a.matrix([[228,408],[273,453]],'Output 2×2');a.finish()
    pool=[[0,2,1,3],[5,6,8,7],[1,2,3,1],[2,3,4,2]]
    a=ai('final-cnn','pooling','cnn-pooling','Pooling ทีละหน้าต่าง|Max ไม่ใช่ Average','จากinputหน้า25ขนาด4×4 ใช้window2×2 stride2 และไม่padding: maxได้[6,8;3,4] แต่averageได้[3.25,4.75;2,2.5] ช่องขวาบนใช้[1,3;8,7]รวม19หาร4=4.75 ไม่ใช้ค่าสูงสุดทั้งภาพแทนทุกwindow','Current lesson #pooling; S11 physical p.25; exact values before slide rounding','cnn','window2, stride2, padding0; เก็บค่าเฉลี่ยก่อนปัด',{'kind':'pooling','input':pool,'max':[[6,8],[3,4]],'average':[[3.25,4.75],[2,2.5]]})
    a.matrix(pool,'Input 4×4',[(0,2),(0,3),(1,2),(1,3)]);a.matrix([[6,8],[3,4]],'Max');a.matrix([[3.25,4.75],[2,2.5]],'Average');a.card(['ขวาบน: max(1,3,8,7)=8','mean=19/4=4.75']);a.finish()


def make_oop():
    a=oop('linked-list','explanation','linked-references','Node กับ Reference|current ไม่ใช่สำเนา Node','headและcurrentอ้างNode10ตัวเดียวกัน จากนั้นnextเชื่อม10→20→30→Noneและtailอ้างNode30 การเลื่อนcurrent=current.nextย้ายเพียงreferencecurrentไป20 ไม่เปลี่ยนheadหรือlinksและไม่คัดลอกNode','Current lesson #explanation / #examples; Week10 physical p.13 traversal; authored values10,20,30','python','Singly linked list ไม่มี cycle; ไม่อ้างตำแหน่ง RAM',{'kind':'linked-references','values':[10,20,30],'edges':['head:n10','current:n10','n10:n20','n20:n30','tail:n30','n30:none']})
    y=a.y;a.node(28,y,'head','head',width=170);a.node(362,y,'current','current',width=170)
    for i,value in enumerate([10,20,30]):a.node(205,y+160+i*140,str(value),'n'+str(value),width=150)
    a.line([(113,y+68),(280,y+160)],BLUE,True,edge='head:n10');a.line([(447,y+68),(280,y+160)],TEAL,True,edge='current:n10')
    for u,v,i in [('n10','n20',0),('n20','n30',1)]:a.line([(280,y+228+i*140),(280,y+300+i*140)],BLUE,True,edge=u+':'+v)
    a.node(28,y+440,'tail','tail',width=150);a.line([(178,y+474),(205,y+474)],TEAL,True,edge='tail:n30');a.node(205,y+580,'None','none',width=150);a.line([(280,y+508),(280,y+580)],BLUE,True,edge='n30:none')
    a.y=y+690;a.card(['current=current.next','ย้าย current ไป 20; head ยังอยู่ 10']);a.finish()
    a=oop('linked-list','insertion','linked-insert','แทรก 25 หลัง 20|เก็บทางไป 30 ก่อน','ก่อนแทรก20.nextอ้าง30 ขั้นแรกnew_node.next=current.nextเชื่อม25ไป30 แล้วcurrent.next=new_nodeจึงเชื่อม20ไป25 ได้10→20→25→30→None; ถ้าสลับสองคำสั่งจะเสี่ยง25ชี้ตัวเองและเสียทางไป30 ตามตัวอย่างบทเดิม ไม่เพิ่ม deletion algorithm ใหม่','Current lesson #insertion / #mistakes; authored insertion example','python','มี reference ไป Node20แล้ว; tailยังอ้าง30',{'kind':'linked-insert','before':[10,20,30],'after':[10,20,25,30],'steps':[['n25','n30'],['n20','n25']]})
    a.row([10,20,30],'ก่อน: 20.next → 30');a.card(['1. new_node.next = current.next','ให้ 25.next → 30 ก่อน']);y=a.y;a.node(28,y,'25','n25',width=180);a.node(352,y,'30','n30',width=180);a.line([(208,y+34),(352,y+34)],TEAL,True,edge='n25:n30');a.y+=110;a.card(['2. current.next = new_node','ให้ 20.next → 25']);a.row([10,20,25,30],'หลัง: 10 → 20 → 25 → 30');a.card(['Head/Tail ไม่เปลี่ยนในตัวอย่างนี้','ค้นหาตำแหน่งก่อนอาจใช้ O(n)']);a.finish()
    a=oop('classes-objects','concepts','class-instances','Class สร้างหลาย Instance|สถานะแยกกันได้','BankAccountเป็นclassและเป็นobjectของtypeด้วย ส่วนaและbอ้างinstancesคนละตัว Aliceเริ่มbalance1000 Bobเริ่ม300 การเรียกa.depositเปลี่ยนเฉพาะสถานะAliceตามตัวอย่าง ไม่คัดลอกบัญชีแม่และไม่สรุปว่าทุกattributeเป็นอิสระเมื่อเก็บmutableobjectร่วมกัน','Current lesson #concepts / #python; Week1 physical pp.3–15; exact authored balances','python','Class เองก็เป็น object; arrows แสดงการสร้าง instance',{'kind':'class-instances','balances':[1000,300],'owners':['Alice','Bob']})
    y=a.y;a.node(80,y,'BankAccount (class)','class',width=400);a.node(28,y+200,'a → Alice','a',width=230);a.node(302,y+200,'b → Bob','b',width=230)
    a.line([(280,y+68),(143,y+200)],BLUE,True,edge='class:a');a.line([(280,y+68),(417,y+200)],BLUE,True,edge='class:b');a.text(143,y+320,'balance=1000',30,anchor='middle');a.text(417,y+320,'balance=300',30,anchor='middle');a.y=y+370;a.card(['Methods ใช้ร่วมตาม Class','แต่ self คือ Instance ผู้รับคำสั่ง']);a.card(['a.deposit(500)','Alice=1500 แต่ Bob=300']);a.finish()
    a=oop('classes-objects','references','object-alias','สองชื่อ อ้าง Object เดียว|Alias ไม่เรียก Init ใหม่','หลังฝาก500และถอน200 a.balance=1300 เมื่อalias=a ทั้งสองชื่ออ้างobjectเดิม แล้วalias.deposit(100)ทำให้a.balanceและalias.balanceเป็น1400พร้อมกัน Bobยัง300 การdel aลบชื่อหนึ่งไม่รับรองทำลายobjectเมื่อaliasยังอ้างอยู่','Current lesson #trace / #references; exact authored BankAccount sequence','python','การ assign อ้างอิง ไม่ใช่ copy/deepcopy',{'kind':'alias','before':1300,'deposit':100,'after':1400,'bob':300,'edges':['a:account','alias:account']})
    y=a.y;a.node(28,y,'a','a',width=180);a.node(352,y,'alias','alias',width=180);a.node(80,y+200,'Alice • balance 1300','account',width=400);a.line([(118,y+68),(280,y+200)],BLUE,True,edge='a:account');a.line([(442,y+68),(280,y+200)],TEAL,True,edge='alias:account');a.y=y+330;a.flow([['alias.deposit(100)','แก้สถานะบัญชีเดิม'],['a.balance = alias.balance','= 1400']]);a.card(['Bob ยัง 300','del a ไม่ลบชื่อ alias']);a.finish()
    a=oop('encapsulation-properties','properties','property-validation','Property เป็นทางผ่าน|ตรวจให้ผ่านก่อนแก้ State','การassign a.balance=valueเรียกsetterซึ่งตรวจชนิดและช่วงค่าก่อนเก็บ__balance ถ้าไม่ผ่านให้raiseแล้วbalanceเดิมไม่เปลี่ยน ตัวอย่างผู้เขียนปฏิเสธbool,NaN,infinityอย่างเปิดเผย ไม่อ้างว่าunderscoreหรือname manglingเป็นระบบsecurity','Current lesson #properties / #python; Week2 pp.9–33; stricter authored number policy','python','ตาม policy ของ Account ในบท ไม่ใช่ค่าทุก domain',{'kind':'property','valid':500,'invalid':-1,'initial':1300})
    a.flow([['a.balance = value','เรียก @balance.setter'],['ตรวจ type / finite / ช่วงค่า','ต้องไม่ติดลบตามสัญญานี้']]);y=a.y;a.node(28,y+60,'ผ่าน','valid',width=230);a.node(302,y+60,'ไม่ผ่าน','invalid',width=230);a.line([(280,y-25),(143,y+60)],TEAL,True,edge='validation:valid');a.line([(280,y-25),(417,y+60)],RED,True,edge='validation:invalid');a.text(143,y+183,'เขียน __balance',28,anchor='middle');a.text(417,y+183,'raise ก่อนเขียน',28,RED,anchor='middle');a.y=y+235;a.card(['Setter ต้องเขียน Backing field','ไม่เรียก self.balance ซ้ำวนไม่จบ']);a.finish()
    a=oop('encapsulation-properties','trace','property-state','คำสั่งล้มเหลว|ต้องคง Balance และ Count','Accountเริ่ม1000/count0 ฝาก500ได้1500/count1 ถอน200ได้1300/count2 แล้วbalance=−1หรือwithdraw1400ถูกปฏิเสธก่อนแก้state จึงยัง1300/count2 การตั้งbalanceผ่านsetterโดยตรงที่ผ่านกฎไม่ใช่depositและไม่เพิ่มcountตามนิยามบท','Current lesson #trace; Week2 account contract plus declared authored validation','python','Count เพิ่มเฉพาะ Deposit/Withdraw ที่สำเร็จ',{'kind':'account-trace','balances':[1000,1500,1300,1300,1300],'counts':[0,1,2,2,2]})
    for action,balance,count in [('สร้าง',1000,0),('Deposit 500',1500,1),('Withdraw 200',1300,2),('Reject balance=−1',1300,2),('Reject withdraw 1400',1300,2)]:a.card([action,'Balance '+str(balance)+' / Count '+str(count)])
    a.finish()
    a=oop('inheritance-mro','concepts','diamond-mro','Diamond กับ MRO|super() เดินตามลำดับจริง','DสืบทอดB,Cซึ่งสืบทอดAเหมือนกัน Pythonให้MRO D,B,C,A,object สำหรับhierarchyนี้ super()ภายในBบนinstanceDจึงไปCไม่ใช่Aโดยตรง ลูกศรสืบทอดชี้ฐาน ไม่ใช่ลำดับเรียกmethod; ลำดับMROแสดงแยกด้านล่าง','Current lesson #concepts / #python; Week3 MRO; authored cooperative chain','python','ลำดับฐาน D(B,C); แต่ละ chain เรียก super()',{'kind':'mro','order':['D','B','C','A','object'],'edges':['B:A','C:A','D:B','D:C']})
    y=a.y;a.node(205,y,'A','A',width=150);a.node(48,y+175,'B','B',width=150);a.node(362,y+175,'C','C',width=150);a.node(205,y+350,'D(B,C)','D',width=150)
    for u,v,pts in [('B','A',[(123,y+175),(250,y+68)]),('C','A',[(437,y+175),(310,y+68)]),('D','B',[(250,y+350),(123,y+243)]),('D','C',[(310,y+350),(437,y+243)])]:a.line(pts,arrow='inherit',edge=u+':'+v)
    a.y=y+465;a.row(['D','B','C','A'],'MRO ก่อน object');a.card(['super ใน B → C ในตัวอย่างนี้','ไม่สร้าง Object พ่ออีกตัว']);a.finish()
    a=oop('inheritance-mro','trace','savings-dispatch','Override แล้วเรียกฐาน|ขั้นต่ำเป็น Contract ที่ต้องตรวจ','Savingsเริ่ม10000/rate0.03 apply_interestได้300แล้วdepositผ่านฐานทำให้ยอด10300/count1; withdraw9800ตรวจขั้นต่ำ500ก่อนเรียกwithdrawฐาน เหลือ500/count2 แต่withdraw1ถูกrejectที่child ไม่เรียกฐานและstateไม่เปลี่ยน สัญญาฐานที่ถอนหมดได้จึงไม่ถูกทดแทนทุกกรณี','Current lesson #trace / #contracts; Week3 p.30 interest; authored withdrawal boundary','python','ขั้นต่ำ500เพิ่ม precondition; ระวัง LSP',{'kind':'savings','initial':10000,'rate':.03,'interest':300,'withdraw':9800,'balance':500,'count':2})
    a.flow([['10000 × 0.03 = 300','Deposit ฐาน → ยอด10300'],['Savings.withdraw(9800)','ตรวจยอดหลังถอน ≥500'],['BankAccount.withdraw','ผ่าน Setter → ยอด500 / Count2']]);a.card(['Withdraw อีก 1 → Reject','คงยอด500 / Count2']);a.card(['Syntax สืบทอดได้ ≠ LSP เสมอ','ต้องตรวจสัญญาที่ Client คาดหวัง']);a.finish()
    a=oop('polymorphism-abc','trace','polymorphic-area','เรียก area() เหมือนกัน|Dispatch ตาม Object ผู้รับ','Clientเรียกs.area()สำหรับแต่ละobject Circleรัศมี2ให้4π≈12.566371 ส่วนRectangle3×4ให้12 แต่ละobjectมีสูตรของตนเองผ่านinterfaceเดียว การปัดสองตำแหน่งเป็นformatตอนแสดงไม่ใช้เป็นค่ากลางคำนวณ','Current lesson #python / #trace; Week4 Shape; authored dimensions2,3,4','abc','หนึ่งการเรียกต่อ Object; สูตร arithmetic คงที่',{'kind':'polymorphism','radius':2,'rectangle':[3,4],'areas':[4*math.pi,12]})
    y=a.y;a.node(105,y,'Client: s.area()','client',width=350);a.node(28,y+185,'Circle(2)','circle',width=230);a.node(302,y+185,'Rectangle','rect',width=230);a.line([(280,y+68),(143,y+185)],BLUE,True,edge='client:circle');a.line([(280,y+68),(417,y+185)],BLUE,True,edge='client:rect');a.text(143,y+310,'4π ≈ 12.566371',28,anchor='middle');a.text(417,y+310,'3×4 = 12',32,anchor='middle');a.y=y+370;a.card(['เลือกตาม Object ที่กำลังเรียก','ไม่ต้องเพิ่ม if ชื่อ Class ทุกตัว']);a.finish()
    a=oop('polymorphism-abc','abc','abc-duck','ABC กับ Duck Typing|ตรวจคนละเงื่อนไข','Shapeมีabstract areaและperimeter จึงสร้างShapeหรือMissingที่ยังทำperimeterไม่ครบไม่ได้ ส่วนBadgeมีareaคืน1จึงใช้total_areaร่วมกับRectangle2×2ได้5 แม้Badgeไม่สืบทอดShapeและไม่จำเป็นต้องมีperimeter การมีmethodชื่อเดียวไม่รับรองพฤติกรรมถูก','Current lesson #abc / #python / #types; Week4; authored Badge','abc','ABCMeta บังคับเฉพาะ abstract methods ที่ค้าง',{'kind':'abc','abstract':['area','perimeter'],'badgeArea':1,'rectangleArea':4,'total':5})
    a.card(['Shape (ABC)','area() + perimeter() ยัง Abstract']);a.card(['Missing มีแค่ area()','สร้าง Instance → TypeError']);a.card(['Badge มี area() → 1','isinstance(Badge(),Shape) → False']);a.row([4,1,5],'total_area รวม Rectangle + Badge');a.card(['Duck Typing ใช้พฤติกรรมร่วม','ต้องตรวจผลตาม Contract ด้วย']);a.finish()
    a=oop('object-relationships','trace','team-player','ย้ายทีม แต่ Player เดิม|Identity และประวัติยังอยู่','TeamAรับreferenceของPlayerpเดิม เมื่อp.score goalsเป็น1 ก่อนremoveจากAแล้วaddเข้าB ไม่สร้างPlayerใหม่ จึงb.players[0] is pและgoalsยัง1 Snapshotของcontainerยังอ้างPlayerเดิมได้แม้Aเอาออกแล้ว ไม่ใช่deepcopy','Current lesson #python / #trace; Week5 Team/Player; no copied private lab code','python','Aggregation ตามกฎ domain; snapshot ไม่ deep copy',{'kind':'team-player','goals':1,'identityPreserved':True,'edges':['teamA:player','teamB:player']})
    y=a.y;a.node(28,y,'Team A','teamA',width=210);a.node(322,y,'Team B','teamB',width=210);a.node(105,y+220,'Player p • goals=1','player',width=350)
    a.line([(133,y+68),(230,y+220)],LINE,True,True,'teamA:player');a.line([(427,y+68),(330,y+220)],TEAL,True,edge='teamB:player');a.text(60,y+140,'เอาออก',32);a.text(350,y+140,'เพิ่มเข้า',32)
    a.y=y+350;a.card(['p ไม่ได้ถูกสร้างใหม่ระหว่างย้าย','b.players[0] is p → True']);a.card(['Tuple snapshot ≠ Deepcopy','แก้ Player ยังเห็นผ่าน Alias ได้']);a.finish()
    a=oop('object-relationships','lifetime','house-composition','House กับ Room|Ownership ไม่ใช่คำสั่ง GC','Houseสร้างRoomภายในจากข้อมูลชื่อ/พื้นที่ Living20 Kitchen12 Bath6 รวม38ตามตัวอย่าง การควบคุมRoomผ่านinterfaceแสดงcompositionเชิงdomain เพชรอยู่ฝั่งHouse ไม่ได้บังคับว่าdel houseทำลายทุกRoomทันทีหากมีaliasหรือเปลี่ยนinterface','Current lesson #python / #trace / #lifetime; Week5 House example and Python qualifications','python','พื้นที่เป็นข้อมูลที่ให้ ไม่สมมติรูปทรงห้อง',{'kind':'composition','areas':[20,12,6],'total':38,'edges':['house:rooms']})
    y=a.y;a.node(105,y,'House','house',width=350);a.node(105,y+175,'Rooms ที่ House สร้าง','rooms',width=350);a.ownership([(280,y+68),(280,y+175)],'composition','house:rooms');a.y=y+310;a.row([20,12,6],'Living / Kitchen / Bath');a.card(['จำนวน 3 ห้อง; พื้นที่รวม38','total_area ต้องรวม r ค่า: O(r)']);a.card(['del ลบชื่ออ้างอิงหนึ่งชื่อ','ไม่ใช่คำสั่งทำลาย Object Graph']);a.finish()
    a=oop('uml-solid','uml','uml-symbols','อ่านหัวลูกศรกับเพชร|อยู่ฝั่งใดมีความหมาย','Generalizationใช้เส้นทึบหัวสามเหลี่ยมโปร่งชี้Base Realizationใช้เส้นประหัวสามเหลี่ยมโปร่งชี้Interface Associationเป็นเส้นทั่วไป Aggregationมีเพชรโปร่งและCompositionมีเพชรทึบที่Whole ไม่ได้สร้างruntime validationหรือบังคับPythonlifetimeเอง','Current lesson #uml; Week6 physical p.26 five worked relationship types','uml','สัญลักษณ์สื่อแบบจำลอง ไม่ใช่ Runtime enforcement',{'kind':'uml','types':['generalization','realization','association','aggregation','composition']})
    for kind,title,left,right in [('generalization','สืบทอด • Generalization','Child','Base'),('realization','Realization','Class','Interface'),('association','Association','Object A','Object B'),('aggregation','Aggregation','Whole','Part'),('composition','Composition','Whole','Part')]:
        y=a.y;a.text(28,y+28,title,32,weight=600);a.node(28,y+55,left,width=190);a.node(342,y+55,right,width=190)
        if kind in ('aggregation','composition'):a.ownership([(218,y+89),(342,y+89)],kind,kind)
        else:a.line([(218,y+89),(342,y+89)],arrow='inherit' if kind!='association' else False,dash=kind=='realization',edge=kind)
        a.y=y+160
    a.card(['สามเหลี่ยมชี้ Base / Interface','เพชรอยู่ฝั่ง Whole']);a.finish()
    a=oop('uml-solid','ocp','solid-service','แยกหน้าที่ใน Service|ขยาย Channel ผ่าน Interface','NotificationServiceใช้Channel.formatสร้างข้อความแล้วส่งMemoryLog.record ผู้เขียนจำลองในmemoryไม่ส่งemailจริง เพิ่มPushที่ทำformatตามinterfaceแล้วใช้notifyเดิมได้ แต่จุดcompositionเลือกChannelใหม่ยังต้องปรับ ไม่อ้างว่าOCPห้ามแก้bugทุกกรณี','Current lesson #srp / #ocp / #python / #trace; Week6–7 notification example','python','จำลองใน Memory; ไม่ส่งข้อความหรือเขียนไฟล์',{'kind':'solid-service','channels':['Email','SMS','Push'],'message':'Push:A:hello','logCount':1})
    a.row(['Email','SMS','Push'],'Implementations ของ Channel');a.flow([['Service.notify(channel,...)','ใช้ Interface เดียว'],['channel.format("A","hello")','Push คืน "Push:A:hello"'],['MemoryLog.record(formatted)','เก็บข้อความ 1 รายการ']]);a.card(['Format / Orchestrate / Record','เปลี่ยนได้คนละเหตุผลตาม SRP']);a.finish()
    a=oop('arrays-dynamic-array','trace','array-resize','Size ไม่ใช่ Capacity|ขยายก่อนเขียนสมาชิกใหม่','โมเดลDynamicArrayเริ่ม[10,20,30,40] size4capacity4 เมื่อappend50ให้สร้างbuffer8ช่อง copyสมาชิกเดิม4ตัวแล้วเขียน50 ได้size5capacity8 ช่องว่างหลังsizeไม่ใช่ข้อมูลจริง และPythonlistไม่ได้รับรองการโตสองเท่าเป๊ะ','Current lesson #amortized / #python / #trace; Week7–8 abstract doubling model','python','Abstract doubling; คัดลอก References ไม่ใช่ Object Graph',{'kind':'array-resize','before':[10,20,30,40],'after':[10,20,30,40,50],'capacities':[4,8],'copies':4,'writes':1})
    a.row([10,20,30,40],'ก่อน: size4 / capacity4');a.card(['เต็ม → จอง Buffer ใหม่ 8 ช่อง','Copy สมาชิกเดิม 4 ตัวก่อน']);a.row([10,20,30,40],'4 References เดิมที่ถูก Copy');a.row([10,20,30,40,50,'_','_','_'],'หลัง Append50: size5 / capacity8');a.card(['ต้นทุนรอบนี้: 4 Copies + 1 Write','_ คือช่องไม่ได้ใช้; None ยังเป็นข้อมูลได้']);a.finish()
    costs=[1,2,3,1,5,1,1,1]
    a=oop('arrays-dynamic-array','amortized','array-amortized','แปด Appends มีต้นทุน15|Amortized ไม่ใช่ทุกครั้ง O(1)','ในโมเดลเริ่มcapacity1และdoubling ต้นทุนwriteใหม่บวกcopyแต่ละappendคือ1,2,3,1,5,1,1,1 รวม15เฉลี่ย15/8=1.875 หน่วย; รอบที่5แพง5หน่วยจึงไม่ใช่เวลาคงที่ทุกcall การพิสูจน์ทั้งลำดับไม่ต้องสมมติinputสุ่มและไม่ใช่เวลาจริงของCPython','Current lesson #amortized; Week8 physical p.7; declared copy/write cost model','python','นับ New writes + Copies; ไม่รวมเวลา Wall-clock',{'kind':'amortized','costs':costs,'capacities':[1,2,4,4,8,8,8,8],'copies':7,'total':15})
    for i,cost in enumerate(costs,1):
        y=a.y;a.text(28,y+32,str(i),32);a.rect(78,y,72*cost,42,'#dceee7' if cost>1 else '#e9f2f6');a.text(92+72*cost,y+32,str(cost),32);a.y+=64
    a.card(['รวม 8 Writes + 7 Copies = 15','เฉลี่ย 15/8 = 1.875']);a.card(['ลำดับ n ครั้งใช้ O(n)','ต่อครั้ง Amortized O(1)']);a.finish()
    a=oop('stack','concepts','stack-lifo','Push / Pop / Peek|เปลี่ยนที่ Top ด้านเดียว','Push10,20,30ทำให้30อยู่Top จากนั้นpopคืน30และนำออก ส่วนpeekอ่าน20โดยไม่ลบจึงsizeยัง2 StackADTกำหนดLIFOแต่ไม่ได้บังคับต้องใช้linkedlistหรือPythonlist ทุกimplementationต้องตกลงempty policyในบทใช้IndexError','Current lesson #concepts / #python; Week11 stack ADT example','collections','Top ด้านเดียว; Peek ไม่ลบข้อมูล',{'kind':'stack','pushes':[10,20,30],'popped':30,'peek':20,'remaining':[10,20]})
    y=a.y
    for i,val in enumerate([30,20,10]):a.node(90,y+i*90,str(val),width=160)
    a.line([(250,y+34),(440,y+34)],TEAL,True,edge='top:pop');a.text(300,y+90,'Pop → 30',32);a.text(300,y+150,'Top ใหม่20',32);a.text(300,y+210,'Size เหลือ2',32)
    a.y=y+320;a.row([10,20],'หลัง Pop • ล่าง → Top');a.card(['Peek → 20 (ไม่ลบ)','Size ยังคง 2']);a.finish()
    a=oop('stack','postfix','postfix-operands','Postfix ใช้ Stack|Pop ขวาก่อนซ้าย','นิพจน์3 4 + 2 *เริ่มstackใหม่ อ่าน3,4แล้วpopright4,left3เพื่อบวกเป็น7 จากนั้นอ่าน2แล้วpopright2,left7คูณได้14 ต้องจบเหลือผลเดียว ส่วน10 3 −ต้อง10−3=7ไม่ใช่−7 ทุกขั้นเป็นข้อมูลคำนวณล่วงหน้าไม่ได้executecodeในเว็บ','Current lesson #postfix; local Lab11-1 cited by existing lesson; authored verified trace','collections','Token คั่นด้วย space; ผลสำเร็จเหลือหนึ่งค่า',{'kind':'postfix','tokens':['3','4','+','2','*'],'states':[[3],[3,4],[7],[7,2],[14]],'result':14})
    for token,state in zip(['3','4','+','2','*'],[[3],[3,4],[7],[7,2],[14]]):a.row(state,'อ่าน '+token+' • Stack ล่าง → Top')
    a.card(['* : Left=7 / Right=2','7×2=14']);a.card(['10 3 − → Left10 − Right3 = 7','สลับ Operand แล้วผลเปลี่ยน']);a.finish()
    a=oop('queue','concepts','queue-fifo','Linked Queue แบบ FIFO|เพิ่มท้าย นำออกหน้า','enqueueAแล้วBแล้วCให้headอ้างAและtailอ้างC dequeueคืนAและย้ายheadไปBโดยtailยังC ถ้าเหลือsingletonแล้วdequeueต้องตั้งทั้งheadและtailเป็นNone เพื่อให้enqueueครั้งถัดไปเริ่มใหม่ถูกต้อง ไม่ใช้list.pop(0)แล้วอ้างO(1)','Current lesson #concepts / #python; Week12 linked queue contract','collections','มี Head/Tail และ Size; Core operation ตามโมเดล',{'kind':'queue','initial':['A','B','C'],'dequeue':'A','remaining':['B','C'],'singletonEmpty':[None,None]})
    a.row(['A','B','C'],'Front → ลำดับ FIFO → Rear');a.card(['Enqueue ที่ Rear','Dequeue ที่ Front → คืน A']);a.row(['B','C'],'หลังนำ A ออก: Head=B / Tail=C');a.flow([['ถ้าเหลือ Node เดียว','Head และ Tail อ้าง Node เดียวกัน'],['Dequeue ตัวสุดท้าย','Head=None / Tail=None']]);a.finish()
    a=oop('queue','trace','queue-circular','Circular Queue วนช่อง|Raw Buffer ไม่ใช่ลำดับ FIFO','Capacity5ใส่ABCDEเต็มแล้วdequeue3ครั้งเหลือD,E จากนั้นenqueueF,Gให้raw[F,G,None,D,E] front3 rear2 size4 แต่FIFOคือD,E,F,G ต้องอ่าน(front+i)%5เพียงsizeครั้ง และrearหมายถึงช่องที่จะใส่ถัดไปตามโค้ดบท','Current lesson #circular / #trace; Week12 source-derived wrap-around convention','collections','Rear = ช่องใส่ถัดไป; Size แยก Full/Empty',{'kind':'circular','capacity':5,'raw':['F','G',None,'D','E'],'front':3,'rear':2,'size':4,'items':['D','E','F','G']})
    a.row([0,1,2,3,4],'Index กายภาพ');a.row(['F','G','_','D','E'],'Raw Buffer หลัง Enqueue F,G');a.card(['Front=3 • Rear=2 • Size=4','อ่าน Index: 3 → 4 → 0 → 1']);a.row(['D','E','F','G'],'Logical FIFO');a.card(['(Front+i) % Capacity','Front==Rear อาจ Full หรือ Empty','ต้องดู Size ตามโมเดลนี้']);a.finish()
    a=oop('complexity-basic-sorting','complexity','operation-growth','Operation Model ก่อน Big-O|ตัวเลขไม่ใช่เวลาเป็นวินาที','เมื่อนับงานคงที่ต่อรอบ loopnให้nครั้ง หารช่วงครึ่งจากnที่เป็นกำลังสองให้log2nขั้น และloopสามเหลี่ยมให้n(n−1)/2 comparisons ที่n8เป็น8,3,28และn16เป็น16,4,120 Big-Oเป็นupperboundไม่ใช่คำว่าworstcaseโดยตัวมันเอง','Current lesson #complexity; Week13 growth model and Phase9 corrected qualification','sort','สมมติแต่ละ Operation มีต้นทุนคงที่',{'kind':'growth','n':[8,16],'linear':[8,16],'halving':[3,4],'triangle':[28,120]})
    a.row([8,16],'n ตัวอย่าง');a.card(['Loop n รอบ','8 → 16 Operations']);a.card(['หารครึ่งจนถึง1','log₂8=3 → log₂16=4 ขั้น']);a.card(['Loop สามเหลี่ยม n(n−1)/2','28 → 120 Comparisons']);a.card(['ระบุ Best / Worst / Amortized','ก่อนสรุป Bound ของกรณีนั้น']);a.finish()
    states=[[5,3,8,1,2],[3,5,1,2,8],[3,1,2,5,8],[1,2,3,5,8],[1,2,3,5,8]]
    a=oop('complexity-basic-sorting','bubble','bubble-passes','Bubble Sort ทีละ Pass|ค่ามากสุดลอยเข้าท้าย','ใช้[5,3,8,1,2]และstrict>เทียบคู่ติดกัน pass1ได้[3,5,1,2,8] pass2ได้[3,1,2,5,8] pass3เรียงครบแล้วแต่ยังมีswapจึงpass4ยืนยันไม่swap รวม10keycomparisonsและ7swaps ไม่ใช้ข้อมูลหกค่าจากsourceอีกหน้าแทน','Current lesson #bubble / #python; Week13 source-derived five-value example','sort','สีเขียวคือ Sorted suffix; strict > ทำให้ Stable',{'kind':'bubble','states':states,'comparisons':10,'swaps':7})
    for i,state in enumerate(states):a.row(state,'Input' if i==0 else 'Pass '+str(i),['#dceee7' if i and (i==4 or j>=5-i) else SOFT for j in range(5)])
    a.card(['10 Key comparisons / 7 Swaps','Pass4 ไม่ Swap → หยุด']);a.finish()
    a=oop('advanced-sorting','merge','merge-final','Merge สองส่วนที่เรียงแล้ว|ฝั่งซ้ายหมดก่อน ไม่ใช่ขวา','Finalmergeของบทใช้left[1,3,5,8]และright[2,4,7,9] เลือก1,2,3,4,5,7,8ด้วย7comparisonsแล้วleftหมดจึงappend9จากright คงcaptionที่บทแก้ไว้ไม่คัดsourcecaptionที่บอกrightหมดก่อน ใช้≤เลือกซ้ายก่อนเมื่อkeyเท่ากัน','Current lesson #merge; Week14 physical pp.14–15 source-caption qualification retained','sort','Merge ใช้ ≤ ให้ Left มาก่อนเมื่อ Tie',{'kind':'merge','left':[1,3,5,8],'right':[2,4,7,9],'selected':[1,2,3,4,5,7,8],'tail':[9],'comparisons':7})
    a.row([1,3,5,8],'Left');a.row([2,4,7,9],'Right');a.row([1,2,3,4,5,7,8],'เลือกด้วย 7 Comparisons');a.card(['Left หมดแล้ว','Right ยังเหลือ 9 → Append']);a.row([1,2,3,4,5,7,8,9],'ผล Merge');a.finish()
    a=oop('advanced-sorting','quick','quick-partition','Lomuto Partition แรก|Pivot เข้าที่ แต่ยังไม่เรียงทั้งหมด','Input[3,6,8,10,1,2,1]เลือกpivotท้าย1และ≤ จนj4สลับ1ไปindex0 จากนั้นวางpivotที่split1 ได้[1,1,8,10,3,2,6] ซ้าย≤1และขวา>1 แต่ขวายังต้องrecursion ไม่เรียกpartitionเดียวว่าfullsortหรือstable','Current lesson #quick; Week14 physical pp.20–22; exact Lomuto code convention','sort','Pivot ท้าย; ≤; ไม่รวม Pivot ใน recursion ถัดไป',{'kind':'partition','input':[3,6,8,10,1,2,1],'afterSwap':[1,6,8,10,3,2,1],'output':[1,1,8,10,3,2,6],'split':1,'pivot':1})
    a.row([3,6,8,10,1,2,1],'เริ่ม • Pivot=1 (ท้าย)');a.row([1,6,8,10,3,2,1],'j4 • Swap Index0 กับ4');a.row([1,1,8,10,3,2,6],'วาง Pivot • Swap Index1 กับ6');a.card(['Split = 1','ซ้าย ≤1 • ขวา >1']);a.card(['[8,10,3,2,6] ยังไม่เรียง','ต้องแก้ Subproblem ต่อ']);a.finish()
    a=oop('hash-tables','resolution','hash-collision','Collision ไม่ใช่ Key เท่ากัน|ต้องตรวจ Equality ต่อ','hashสมมติ10และ18ที่capacity8ให้index2ทั้งคู่ แต่keysต่างกันยังต้องเก็บร่วมกัน Chainingเก็บหลายentriesในbucket2 ส่วนLinearProbingลอง2แล้ว3เมื่อชน ไม่ทิ้งentryเก่าและไม่ใช้hashเท่ากันแทนequality','Current lesson #concepts / #resolution / practice1; Week15; authored fixed hashes not process-random strings','hash','Hash สมมติที่ประกาศ; Modulus=8',{'kind':'collision','hashes':[10,18],'capacity':8,'indices':[2,2],'probes':[2,3]})
    a.row([10,18],'Hash สมมติของ Key ต่างกัน');a.card(['10 % 8 = 2','18 % 8 = 2']);y=a.y;a.node(28,y,'Bucket 2','bucket',width=190);a.node(342,y,'Key A, B','entries',width=190);a.line([(218,y+34),(342,y+34)],BLUE,True,edge='bucket:entries');a.y+=120;a.card(['Chaining: เก็บสอง Entries ร่วมกัน','แต่ยังตรวจว่า Key ใด Equal']);a.row([2,3],'Probing: เริ่ม2 แล้วลอง3ถ้าชน');a.finish()
    a=oop('hash-tables','trace','hash-tombstone','Tombstone รักษาทางค้น|Update ต้องหา Key เดิมก่อน','ForcedKey A,B,Cมีhash2และcapacity5 จึงอยู่slot2,3,4 ลบAต้องใส่TOMBSTONEที่2 แล้วupdateB42ต้องเดินผ่านmarkerจนพบBที่3และsizeยัง2 ไม่reuse2ทันทีจนเกิดduplicateB และทุกprobeต้องจบภายในcapacityครั้ง','Current lesson #trace / #python; Week15 source with declared bounded-probe/update correction','hash','Sentinel ใช้ is; ค้นต่อผ่าน Tombstone',{'kind':'tombstone','capacity':5,'hash':2,'before':['A1','B2','C3'],'after':['T','B42','C3'],'size':2,'probe':[2,3]})
    a.row([2,3,4],'Slot ที่เกี่ยวข้อง');a.row(['A1','B2','C3'],'ก่อนลบ A');a.row(['T','B2','C3'],'Delete A • T=Tombstone');a.row(['T','B42','C3'],'Update B • ไม่เพิ่ม Size');a.card(['Get/Update B: 2 → 3','ผ่าน T ไม่หยุดเหมือน None']);a.card(['Size ยังคง 2','Probe ได้ไม่เกิน Capacity ครั้ง']);a.finish()


def make():
    OUT.mkdir(parents=True,exist_ok=True)
    make_ai();make_oop()
    (ROOT/'scripts/ai-oop-visuals.json').write_text(json.dumps(dict(version=1,baseline='41ae0f2440c4161ec90068a495e28a9cd31e3f77',assets=items),ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    print('Authored',len(items),'original editable diagrams; source lessons and banks not modified.')


if __name__=='__main__':make()
