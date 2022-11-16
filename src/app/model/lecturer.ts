export class Lecturer {
  id: string;
  name: string;
  totalPubs: number;
  pubs: Map<number, number>;
  department: string;
  faculty: string;
  university: string;

  constructor(id: string, name: string, year: number, pubs: number, department: string, faculty: string, university: string) {
    this.id = id;
    this.name = name;
    this.pubs = new Map<number, number>();
    this.pubs.set(year, pubs),
    this.totalPubs = pubs;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
  }

  addPublication(year: number, pubs: number) {
    this.pubs.set(year, pubs);
    this.totalPubs += pubs;
  }


}
