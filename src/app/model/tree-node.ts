import { Lecturer } from 'src/app/model/lecturer';
export class TreeNode {

  public name: string;
  public children: (Lecturer | TreeNode)[];
  public totalPubs: number;

  constructor(name: string) {
    this.name = name;
    this.children = [];
    this.totalPubs = 0;
  }

  addChild(child: Lecturer | TreeNode) {
    this.children.push(child);
    this.totalPubs += child.totalPubs;
  }

}
