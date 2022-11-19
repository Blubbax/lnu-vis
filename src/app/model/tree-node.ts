import { Lecturer } from 'src/app/model/lecturer';
export class TreeNode {

  public name: string;
  public layer: string;
  public parent: TreeNode | null;
  public children: (Lecturer | TreeNode)[];
  public totalChildPubs: number;
  public printableName: string;

  constructor(name: string, layer: string = "", parent: (TreeNode | null)) {
    this.name = name;
    this.layer = layer;
    this.printableName = name;
    this.parent = parent;
    this.children = [];
    this.totalChildPubs = 0;

    this.determinePrintableName();
  }

  addChild(child: Lecturer | TreeNode) {
    this.children.push(child);
  }

  updatePubs() {
    this.totalChildPubs = 0;

    this.children.forEach(child => {
      if (child instanceof Lecturer) {
        this.totalChildPubs += child.totalPubs;
      } else {
        this.totalChildPubs += child.updatePubs();
      }
    })

    return this.totalChildPubs;
  }

  private determinePrintableName() {
    const length = this.printableName.length;
    var nameParts = this.printableName.split(" ");
    var wordsPerLine = 3;
    var currentWords = 0;

    this.printableName = "";
    nameParts.forEach(part => {
      if (currentWords < wordsPerLine) {
        currentWords++;
        this.printableName += part + " "
      } else {
        currentWords = 0;
        this.printableName += part + " "
      }
    })


  }

}
