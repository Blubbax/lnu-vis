import { PublicationRecord } from './publication-record';

export class TreeNode {

  public name: string;
  public layer: string;
  public parent: TreeNode | null;
  public children: (PublicationRecord | TreeNode)[];
  public totalChildPubs: number;
  public label: string;
  public nameShort: string;

  constructor(name: string, layer: string = "", parent: (TreeNode | null)) {
    this.name = name;
    this.layer = layer;
    this.parent = parent;
    this.children = [];
    this.totalChildPubs = 0;
    this.nameShort = name;

    var substrings = name.match(/\((.*?)\)/);
    if (substrings) {
      this.nameShort = substrings[1];
    }
    this.label = this.nameShort;
  }

  addChild(child: PublicationRecord | TreeNode) {
    this.children.push(child);
  }

  updatePubs() {
    this.totalChildPubs = 0;

    this.children.forEach(child => {
      if (child instanceof PublicationRecord) {
        this.totalChildPubs += child.publications;
      } else {
        this.totalChildPubs += child.updatePubs();
      }
    })

    return this.totalChildPubs;
  }


}
