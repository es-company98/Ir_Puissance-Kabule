import * as THREE from '../vendor/three.module.js';
import { OrbitControls } from '../vendor/OrbitControls.js';

const EASE_OUT_CUBIC = (t) => 1 - Math.pow(1 - t, 3);
const PHASE_DURATION = 640;
const PHASE_STAGGER = 520;
const STABILIZE_DURATION = 420;
const START_Y = -3.5;
const START_SCALE_Y = 0.05;
const CAM_TARGET = new THREE.Vector3(0.4, 2.15, 0.2);
const CAM_HOME = new THREE.Vector3(-11.5, 7.2, 13.5);
const DPR_CAP = 1.5;

const MAT = {
    plaster: new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.88, metalness: 0.02 }),
    stone: new THREE.MeshStandardMaterial({ color: 0xcbb89a, roughness: 0.92, metalness: 0.04 }),
    stoneDark: new THREE.MeshStandardMaterial({ color: 0xb39d7c, roughness: 0.9, metalness: 0.04 }),
    wood: new THREE.MeshStandardMaterial({ color: 0xc9a06a, roughness: 0.72, metalness: 0.04 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0xa67c45, roughness: 0.7, metalness: 0.05 }),
    soffit: new THREE.MeshStandardMaterial({ color: 0xdfc39a, roughness: 0.65, metalness: 0.03 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x3a3e44, roughness: 0.55, metalness: 0.18 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x6a7180, roughness: 0.45, metalness: 0.55 }),
    glass: new THREE.MeshStandardMaterial({
        color: 0x8fb9cc,
        roughness: 0.08,
        metalness: 0.12,
        transparent: true,
        opacity: 0.42,
    }),
    slab: new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.95, metalness: 0.02 }),
    light: new THREE.MeshStandardMaterial({
        color: 0xf7efe0,
        roughness: 0.4,
        metalness: 0.1,
        emissive: 0xffe7b8,
        emissiveIntensity: 0.85,
    }),
};

const addBox = (parent, w, h, d, mat, x, y, z, shadow = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = shadow;
    mesh.receiveShadow = shadow;
    parent.add(mesh);
    return mesh;
};

const addWindow = (parent, w, h, x, y, z, rotY = 0) => {
    const unit = new THREE.Group();
    addBox(unit, w, h, 0.1, MAT.woodDark, 0, 0, 0, false);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.14, h - 0.14), MAT.glass);
    glass.position.z = 0.06;
    unit.add(glass);
        addBox(unit, 0.05, h - 0.16, 0.04, MAT.woodDark, 0, 0, 0.05, false);
    unit.position.set(x, y, z);
    unit.rotation.y = rotY;
    parent.add(unit);
};

const addRailing = (parent, width, x, y, z, rotY = 0) => {
    const rail = new THREE.Group();
    const posts = 6;
    const postH = 0.92;
    for (let i = 0; i < posts; i += 1) {
        const px = -width / 2 + (i * width) / (posts - 1);
        addBox(rail, 0.045, postH, 0.045, MAT.metal, px, postH / 2, 0, false);
    }
    for (let i = 0; i < 3; i += 1) {
        addBox(rail, width, 0.03, 0.03, MAT.metal, 0, 0.22 + i * 0.26, 0.02, false);
    }
    rail.position.set(x, y, z);
    rail.rotation.y = rotY;
    parent.add(rail);
};

const addHipRoof = (parent, width, depth, height, x, y, z) => {
    const wrap = new THREE.Group();
    const geom = new THREE.ConeGeometry(1, height, 4);
    const mesh = new THREE.Mesh(geom, MAT.roof);
    mesh.rotation.y = Math.PI / 4;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    wrap.add(mesh);
    wrap.scale.set(width * 0.74, 1, depth * 0.74);
    wrap.position.set(x, y, z);
    parent.add(wrap);
    return wrap;
};

const buildHouse = () => {
    const houseGroup = new THREE.Group();
    const foundation = new THREE.Group();
    const wallsRdc = new THREE.Group();
    const wallsAnnex = new THREE.Group();
    const annexRoof = new THREE.Group();
    const floorSlab = new THREE.Group();
    const upperFloor = new THREE.Group();
    const mainRoof = new THREE.Group();
    const joinery = new THREE.Group();
    const balcony = new THREE.Group();
    const pergola = new THREE.Group();
    const lights = new THREE.Group();

    const stoneH = 0.42;
    const rdcH = 3.12;
    const annexH = 2.68;
    const upperH = 2.52;
    const mainW = 6.6;
    const mainD = 7.35;
    const mainX = -1.15;
    const mainZ = 0.12;
    const annexW = 5.05;
    const annexD = 5.55;
    const annexX = 4.4;
    const annexZ = 0.35;
    const rdcY = stoneH + rdcH / 2;
    const annexY = stoneH + annexH / 2;
    const slabY = stoneH + rdcH + 0.1;
    const upperY = slabY + 0.1 + upperH / 2;

    addBox(foundation, 12.4, 0.16, 10.2, MAT.slab, 0.7, 0.08, 0.15);
    addBox(foundation, mainW + 0.22, stoneH, mainD + 0.22, MAT.stone, mainX, stoneH / 2, mainZ);
    addBox(foundation, annexW + 0.22, stoneH, annexD + 0.22, MAT.stone, annexX, stoneH / 2, annexZ);
    addBox(foundation, 3.6, 0.18, 2.8, MAT.stoneDark, -2.15, 0.12, 4.05);

    addBox(wallsRdc, mainW, rdcH, mainD, MAT.plaster, mainX, rdcY, mainZ);

    addBox(wallsAnnex, annexW, annexH, annexD, MAT.plaster, annexX, annexY, annexZ);

    addHipRoof(annexRoof, annexW + 0.55, annexD + 0.55, 1.72, annexX, stoneH + annexH + 0.86, annexZ);
    addBox(annexRoof, annexW + 0.7, 0.07, 0.09, MAT.metal, annexX, stoneH + annexH + 0.12, annexZ + annexD / 2 + 0.12, false);
    addBox(annexRoof, annexW + 0.7, 0.07, 0.09, MAT.metal, annexX, stoneH + annexH + 0.12, annexZ - annexD / 2 - 0.12, false);
    addBox(annexRoof, 0.07, 1.35, 0.07, MAT.metal, annexX + annexW / 2 + 0.18, stoneH + annexH / 2 + 0.2, annexZ + annexD / 2 - 0.4, false);
    addBox(annexRoof, 0.07, 1.35, 0.07, MAT.metal, annexX - annexW / 2 - 0.18, stoneH + annexH / 2 + 0.2, annexZ - annexD / 2 + 0.5, false);

    addBox(floorSlab, mainW + 0.18, 0.2, mainD + 0.18, MAT.slab, mainX, slabY, mainZ);

    addBox(upperFloor, 6.15, upperH, 6.55, MAT.wood, -0.95, upperY, 0.05);
    for (let i = 0; i < 7; i += 1) {
        const bandY = slabY + 0.28 + i * 0.32;
        addBox(upperFloor, 6.22, 0.04, 0.04, MAT.woodDark, -0.95, bandY, 3.3, false);
        addBox(upperFloor, 0.04, 0.04, 6.62, MAT.woodDark, -4.05, bandY, 0.05, false);
        addBox(upperFloor, 0.04, 0.04, 6.62, MAT.woodDark, 2.15, bandY, 0.05, false);
    }

    addBox(mainRoof, 7.35, 0.1, 7.7, MAT.soffit, -0.95, slabY + 0.2 + upperH + 0.08, 0.05);
    addBox(mainRoof, 7.05, 0.2, 7.35, MAT.roof, -0.95, slabY + 0.2 + upperH + 0.24, 0.05);
    addBox(mainRoof, 0.72, 1.55, 0.72, MAT.stone, 1.55, slabY + 0.2 + upperH + 1.05, -1.55);
    addBox(mainRoof, 0.5, 0.22, 0.5, MAT.stoneDark, 1.55, slabY + 0.2 + upperH + 1.92, -1.55, false);

    addWindow(joinery, 2.35, 2.05, -4.5, stoneH + 1.55, 2.55, -Math.PI / 2);
    addWindow(joinery, 2.35, 2.05, -4.5, stoneH + 1.55, 0.05, -Math.PI / 2);
    addWindow(joinery, 2.05, 2.05, -2.85, stoneH + 1.55, 3.85);
    addWindow(joinery, 1.15, 1.05, -0.35, stoneH + 1.85, 3.85);
    addWindow(joinery, 1.15, 1.05, 1.15, stoneH + 1.85, 3.85);
    addBox(joinery, 1.05, 2.15, 0.12, MAT.wood, 0.35, stoneH + 1.25, 3.86);
    addBox(joinery, 0.72, 1.55, 0.04, MAT.glass, 0.35, stoneH + 1.35, 3.93, false);
    const garageX = annexX + annexW / 2 + 0.08;
    addBox(joinery, 0.14, 2.05, 2.45, MAT.wood, garageX, annexY - 0.05, annexZ);
    addBox(joinery, 0.05, 0.06, 2.2, MAT.woodDark, garageX + 0.08, annexY + 0.4, annexZ, false);
    addBox(joinery, 0.05, 0.06, 2.2, MAT.woodDark, garageX + 0.08, annexY, annexZ, false);
    addBox(joinery, 0.05, 0.06, 2.2, MAT.woodDark, garageX + 0.08, annexY - 0.4, annexZ, false);
    addWindow(joinery, 0.95, 0.7, 4.55, stoneH + 1.55, 3.18);
    addWindow(joinery, 0.95, 0.7, 5.65, stoneH + 1.55, 3.18);
    addWindow(joinery, 1.35, 1.15, -2.55, upperY + 0.15, 3.38);
    addWindow(joinery, 1.35, 1.15, 0.15, upperY + 0.15, 3.38);
    addWindow(joinery, 1.15, 1.15, 1.55, upperY + 0.15, 3.38);
    addWindow(joinery, 1.2, 1.15, -4.08, upperY + 0.15, 1.55, -Math.PI / 2);
    addWindow(joinery, 1.2, 1.15, -4.08, upperY + 0.15, -0.85, -Math.PI / 2);

    addBox(balcony, 3.15, 0.12, 1.28, MAT.slab, -2.35, slabY + 0.16, 3.55);
    addRailing(balcony, 3.05, -2.35, slabY + 0.22, 4.12);
    addRailing(balcony, 1.15, -3.85, slabY + 0.22, 3.55, Math.PI / 2);

    const pergolaX = -2.2;
    const pergolaZ = 4.15;
    const postH = 2.62;
    const postY = stoneH + postH / 2;
    addBox(pergola, 0.16, postH, 0.16, MAT.wood, pergolaX - 1.35, postY, pergolaZ + 0.95);
    addBox(pergola, 0.16, postH, 0.16, MAT.wood, pergolaX + 1.35, postY, pergolaZ + 0.95);
    addBox(pergola, 0.16, postH, 0.16, MAT.wood, pergolaX - 1.35, postY, pergolaZ - 0.85);
    addBox(pergola, 0.16, postH, 0.16, MAT.wood, pergolaX + 1.35, postY, pergolaZ - 0.85);
    addBox(pergola, 2.95, 0.12, 0.16, MAT.wood, pergolaX, stoneH + postH + 0.06, pergolaZ + 0.95);
    addBox(pergola, 2.95, 0.12, 0.16, MAT.wood, pergolaX, stoneH + postH + 0.06, pergolaZ - 0.85);
    addBox(pergola, 0.16, 0.12, 1.95, MAT.wood, pergolaX - 1.35, stoneH + postH + 0.18, pergolaZ + 0.05);
    addBox(pergola, 0.16, 0.12, 1.95, MAT.wood, pergolaX + 1.35, stoneH + postH + 0.18, pergolaZ + 0.05);
    for (let i = 0; i < 7; i += 1) {
        addBox(pergola, 0.07, 0.07, 1.9, MAT.wood, pergolaX - 1.2 + i * 0.4, stoneH + postH + 0.28, pergolaZ + 0.05, false);
    }

    addBox(lights, 0.12, 0.22, 0.08, MAT.light, 0.95, stoneH + 1.85, 3.86, false);
    addBox(lights, 0.12, 0.22, 0.08, MAT.light, -0.25, stoneH + 1.85, 3.86, false);
    addBox(lights, 0.08, 0.22, 0.12, MAT.light, garageX + 0.02, annexY + 0.45, annexZ + 1.15, false);
    addBox(lights, 0.08, 0.22, 0.12, MAT.light, garageX + 0.02, annexY + 0.45, annexZ - 1.15, false);

    const phases = [
        foundation,
        wallsRdc,
        wallsAnnex,
        annexRoof,
        floorSlab,
        upperFloor,
        mainRoof,
        joinery,
        balcony,
        pergola,
        lights,
    ];

    phases.forEach((group) => {
        houseGroup.add(group);
    });

    return { houseGroup, phases };
};

const canCreateWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
        return false;
    }
};

const hideHero3d = () => {
    const panel = document.getElementById('hero-3d-right');
    if (panel) {
        panel.classList.add('is-unavailable');
    }
};

const tween = (duration, onUpdate, shouldAbort) => new Promise((resolve) => {
    let start = null;
    const step = (now) => {
        if (shouldAbort()) {
            resolve(false);
            return;
        }
        if (start === null) {
            start = now;
        }
        const t = Math.min(1, (now - start) / duration);
        onUpdate(EASE_OUT_CUBIC(t));
        if (t < 1) {
            window.requestAnimationFrame(step);
        } else {
            resolve(true);
        }
    };
    window.requestAnimationFrame(step);
});

const wait = (ms, shouldAbort) => new Promise((resolve) => {
    window.setTimeout(() => {
        resolve(!shouldAbort());
    }, ms);
});

export const initHero3d = () => {
    const wrap = document.getElementById('hero-3d-canvas-wrap');
    const btnBuild = document.getElementById('btn-build');
    const btnReset = document.getElementById('btn-reset');

    if (!wrap || !btnBuild || !btnReset) {
        return false;
    }

    if (!canCreateWebGL()) {
        hideHero3d();
        return false;
    }

    const isMobile = window.matchMedia('(max-width: 959px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useShadows = !isMobile && !reducedMotion;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
        });
    } catch {
        hideHero3d();
        return false;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = useShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.id = 'hero-3d-canvas';
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    camera.position.copy(CAM_HOME);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 9;
    controls.maxDistance = 24;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2.12;
    controls.target.copy(CAM_TARGET);
    controls.update();

    const hemi = new THREE.HemisphereLight(0xd7e7f5, 0x2c241c, 0.9);
    scene.add(hemi);

    const ambient = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff3e4, 1.2);
    sun.position.set(-9, 16, 11);
    sun.castShadow = useShadows;
    if (useShadows) {
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.near = 2;
        sun.shadow.camera.far = 42;
        const extent = 14;
        sun.shadow.camera.left = -extent;
        sun.shadow.camera.right = extent;
        sun.shadow.camera.top = extent;
        sun.shadow.camera.bottom = -extent;
        sun.shadow.bias = -0.0004;
    }
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0x8ecae6, 0.28);
    fill.position.set(10, 6, -8);
    scene.add(fill);

    const ground = new THREE.Mesh(
        new THREE.CircleGeometry(16, 48),
        new THREE.MeshStandardMaterial({ color: 0x0c1826, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = useShadows;
    scene.add(ground);

    const { houseGroup, phases } = buildHouse();
    scene.add(houseGroup);

    let buildToken = 0;
    let cinematic = false;
    let orbitAngle = Math.atan2(CAM_HOME.z - CAM_TARGET.z, CAM_HOME.x - CAM_TARGET.x);
    let orbitRadius = Math.hypot(CAM_HOME.x - CAM_TARGET.x, CAM_HOME.z - CAM_TARGET.z);
    let running = false;

    const setControlsLocked = (locked) => {
        controls.enableRotate = !locked;
        controls.enableZoom = !locked;
    };

    const applyRest = (group, visible) => {
        group.visible = visible;
        group.position.y = visible ? 0 : START_Y;
        group.scale.set(1, visible ? 1 : START_SCALE_Y, 1);
    };

    const resetCamera = () => {
        cinematic = false;
        camera.position.copy(CAM_HOME);
        controls.target.copy(CAM_TARGET);
        orbitAngle = Math.atan2(CAM_HOME.z - CAM_TARGET.z, CAM_HOME.x - CAM_TARGET.x);
        orbitRadius = Math.hypot(CAM_HOME.x - CAM_TARGET.x, CAM_HOME.z - CAM_TARGET.z);
        setControlsLocked(false);
        controls.update();
    };

    const hardReset = () => {
        cinematic = false;
        houseGroup.scale.set(1, 1, 1);
        phases.forEach((group) => applyRest(group, false));
        resetCamera();
        btnBuild.disabled = false;
        btnReset.disabled = false;
    };

    const shouldAbort = (token) => token !== buildToken;

    const animatePhase = async (group, token) => {
        if (reducedMotion) {
            applyRest(group, true);
            return !shouldAbort(token);
        }
        group.visible = true;
        const ok = await tween(PHASE_DURATION, (e) => {
            group.position.y = START_Y + (0 - START_Y) * e;
            group.scale.y = START_SCALE_Y + (1 - START_SCALE_Y) * e;
        }, () => shouldAbort(token));
        if (ok) {
            applyRest(group, true);
        }
        return ok;
    };

    const runTimeline = async (token) => {
        cinematic = !reducedMotion;
        setControlsLocked(true);
        btnBuild.disabled = true;

        const pending = [];
        for (let i = 0; i < phases.length; i += 1) {
            if (shouldAbort(token)) {
                return;
            }
            pending.push(animatePhase(phases[i], token));
            if (i < phases.length - 1) {
                const waited = await wait(PHASE_STAGGER, () => shouldAbort(token));
                if (!waited) {
                    return;
                }
            }
        }

        const results = await Promise.all(pending);
        if (shouldAbort(token) || results.some((ok) => !ok)) {
            return;
        }

        if (!reducedMotion) {
            const ok = await tween(STABILIZE_DURATION, (e) => {
                const bump = 1 + Math.sin(e * Math.PI) * 0.012;
                houseGroup.scale.set(bump, bump, bump);
            }, () => shouldAbort(token));
            if (!ok) {
                return;
            }
        }

        houseGroup.scale.set(1, 1, 1);
        cinematic = false;
        setControlsLocked(false);
        btnBuild.disabled = false;
    };

    const onBuild = () => {
        buildToken += 1;
        const token = buildToken;
        hardReset();
        runTimeline(token);
    };

    const onReset = () => {
        buildToken += 1;
        hardReset();
    };

    const resize = () => {
        const width = wrap.clientWidth;
        const height = wrap.clientHeight;
        if (width < 1 || height < 1) {
            return;
        }
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));
        renderer.setSize(width, height, false);
    };

    const renderLoop = () => {
        if (!running) {
            return;
        }
        if (cinematic) {
            orbitAngle += 0.0028;
            camera.position.x = CAM_TARGET.x + Math.cos(orbitAngle) * orbitRadius;
            camera.position.z = CAM_TARGET.z + Math.sin(orbitAngle) * orbitRadius;
            camera.lookAt(CAM_TARGET);
            controls.target.copy(CAM_TARGET);
        } else {
            controls.update();
        }
        renderer.render(scene, camera);
    };

    const startLoop = () => {
        if (running) {
            return;
        }
        running = true;
        renderer.setAnimationLoop(renderLoop);
    };

    const stopLoop = () => {
        running = false;
        renderer.setAnimationLoop(null);
    };

    hardReset();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                startLoop();
            } else {
                stopLoop();
            }
        },
        { threshold: 0.08 }
    );
    visibilityObserver.observe(wrap);

    btnBuild.addEventListener('click', onBuild);
    btnReset.addEventListener('click', onReset);

    startLoop();
    return true;
};
