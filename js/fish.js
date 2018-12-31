class Vehicle {
  constructor(x, y) {
    const fishColor = [
      { filet: color(153, 206, 255), body: color(30, 144, 255) },
      { filet: color(255, 199, 179), body: color(255, 127, 80) },
      { filet: color(161, 230, 189), body: color(46, 139, 87) }
    ];

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.maxspeed = random(2, 6);
    this.maxforce = random(0.05, 0.12);
    this.theta = 0;
    this.color = fishColor[floor(random(3))];
  }

  update() {
    this.theta += PI / 100;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.position);

    let d = desired.mag();
    if (d < 120) {
      let m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display() {
    const theta = this.velocity.heading() + PI / 2;

    push();
    noStroke();
    translate(this.position.x, this.position.y);
    rotate(theta);

    //左右のヒレ
    for (let i = -1; i <= 1; i += 2) {
      push();
      fill(this.color.filet);
      translate(0, 10);
      rotate((PI / 12) * sin(this.theta * 2) * i);

      beginShape();
      vertex(0, 0);
      vertex(12 * i, 4);
      vertex(10 * i, 10);
      vertex(0, 4);
      endShape();
      pop();
    }
    ////////////

    //尻尾
    push();
    fill(this.color.filet);
    translate(0, 25);
    rotate((PI / 12) * sin(this.theta * 2));
    beginShape();
    vertex(0, 0);
    bezierVertex(0, 0, 5, 5, 3, 15);
    bezierVertex(3, 15, 0, 8, 0, 8);
    bezierVertex(0, 8, 0, 8, -3, 15);
    bezierVertex(-3, 15, -5, 5, 0, 0);
    endShape();
    pop();

    //胴体
    beginShape();
    fill(this.color.body);
    vertex(0, 30);
    bezierVertex(0, 30, -10, 10, 0, 0);
    bezierVertex(0, 0, 10, 10, 0, 30);
    endShape();

    pop();
  }
}
