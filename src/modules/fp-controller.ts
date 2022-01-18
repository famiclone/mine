import { Camera, MathUtils, Spherical, Vector3 } from 'three';

const _lookDirection = new Vector3();
const _spherical = new Spherical();
const _target = new Vector3();

class FPController {
  domElement: HTMLElement | Document;

  enabled: boolean;

  movementSpeed: number;
  lookSpeed: number;

  lookVertical: boolean;
  autoForward: boolean;

  activeLook: boolean;

  heightSpeed: boolean;
  heightCoef: number;
  heightMin: number;
  heightMax: number;

  constrainVertical: boolean;
  verticalMin: number;
  verticalMax: number;

  mouseDragOn: boolean;

  autoSpeedFactor: number;

  mouseX: number;
  mouseY: number;

  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;

  viewHalfX: number;
  viewHalfY: number;

  lat: number;
  lon: number;

  moveUp: boolean;
  moveDown: boolean;

  constructor(private object: Camera, domElement: HTMLElement | Document) {
    this.object = object;
    this.domElement = domElement;

    this.enabled = true;

    this.movementSpeed = 0.05;
    this.lookSpeed = 0.00005;

    this.lookVertical = false;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.mouseDragOn = false;

    this.autoSpeedFactor = 0.0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    this.lat = 0;
    this.lon = 0;

    this.moveUp = false;
    this.moveDown = false;

    // const _onMouseMove = this.onMouseMove.bind(this);
    // const _onMouseDown = this.onMouseDown.bind(this);
    // const _onMouseUp = this.onMouseUp.bind(this);
    // const _onKeyDown = this.onKeyDown.bind(this);
    // const _onKeyUp = this.onKeyUp.bind(this);

    domElement.addEventListener('contextmenu', contextmenu);
    //@ts-ignore
    this.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    //@ts-ignore
    this.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
    //@ts-ignore
    this.domElement.addEventListener('mouseup', (e) => this.onMouseUp(e));

    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));

    // this.handleResize();

    this.setOrientation(this);
  }
  dispose() {
    this.domElement.removeEventListener('contextmenu', contextmenu);
    this.domElement.removeEventListener(
      'mousedown',
      //@ts-ignore
      this.onMouseDown,
    );
    this.domElement.removeEventListener(
      'mousemove',
      //@ts-ignore
      this.onMouseMove,
    );
    //@ts-ignore
    this.domElement.removeEventListener('mouseup', this.onMouseUp);

    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onMouseMove(event: MouseEvent) {
    if (this.domElement === document) {
      this.mouseX = event.pageX - this.viewHalfX;
      this.mouseY = event.pageY - this.viewHalfY;
    } else {
      // @ts-ignore
      this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
      // @ts-ignore
      this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
    }
  }
  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;

      case 'KeyR':
        this.moveUp = true;
        break;
      case 'KeyF':
        this.moveDown = true;
        break;
    }
  }
  onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;

      case 'KeyR':
        this.moveUp = false;
        break;
      case 'KeyF':
        this.moveDown = false;
        break;
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.domElement !== document) {
      // @ts-ignore
      this.domElement.focus();
    }

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = true;
          break;
        case 2:
          this.moveBackward = true;
          break;
      }
    }

    this.mouseDragOn = true;
  }
  onMouseUp(event: MouseEvent) {
    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = false;
          break;
        case 2:
          this.moveBackward = false;
          break;
      }
    }

    this.mouseDragOn = false;
  }

  handleResize() {
    if (this.domElement === document) {
      this.viewHalfX = window.innerWidth / 2;
      this.viewHalfY = window.innerHeight / 2;
    } else {
      // @ts-ignore
      this.viewHalfX = this.domElement.offsetWidth / 2;
      // @ts-ignore
      this.viewHalfY = this.domElement.offsetHeight / 2;
    }
  }

  setOrientation(controls: FPController) {
    const quaternion = controls.object.quaternion;

    _lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
    _spherical.setFromVector3(_lookDirection);

    this.lat = 90 - MathUtils.radToDeg(_spherical.phi);
    this.lon = MathUtils.radToDeg(_spherical.theta);
  }

  lookAt(x: any, y: any, z: any) {
    if (x.isVector3) {
      _target.copy(x);
    } else {
      _target.set(x, y, z);
    }

    this.object.lookAt(_target);

    this.setOrientation(this);

    return this;
  }

  update(delta: number = 0.1) {
    const targetPosition = new Vector3();

    if (this.enabled === false) return;

    if (this.heightSpeed) {
      const y = MathUtils.clamp(
        this.object.position.y,
        this.heightMin,
        this.heightMax,
      );
      const heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
    } else {
      this.autoSpeedFactor = 0.0;
    }

    const actualMoveSpeed = delta * this.movementSpeed;

    if (this.moveForward || (this.autoForward && !this.moveBackward))
      this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
    if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

    if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
    if (this.moveRight) this.object.translateX(actualMoveSpeed);

    if (this.moveUp) this.object.translateY(actualMoveSpeed);
    if (this.moveDown) this.object.translateY(-actualMoveSpeed);

    let actualLookSpeed = delta * this.lookSpeed;

    if (this.activeLook === false) {
      actualLookSpeed = 0;
    }

    let verticalLookRatio = 1;

    if (this.constrainVertical) {
      verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
    }

    this.lon -= this.mouseX * actualLookSpeed;
    if (this.lookVertical)
      this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

    this.lat = Math.max(-85, Math.min(85, this.lat));

    let phi = MathUtils.degToRad(90 - this.lat);
    const theta = MathUtils.degToRad(this.lon);

    if (this.constrainVertical) {
      phi = MathUtils.mapLinear(
        phi,
        0,
        Math.PI,
        this.verticalMin,
        this.verticalMax,
      );
    }

    const position = this.object.position;

    targetPosition.setFromSphericalCoords(1, phi, theta).add(position);

    this.object.lookAt(targetPosition);
  }
}

function contextmenu(event: Event) {
  event.preventDefault();
}

export default FPController;
