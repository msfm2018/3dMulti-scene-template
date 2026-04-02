import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
// --- 全局变量 ---
let renderer, camera, clock, controls, container;
let scene1, scene2, scene3, scene4, currentScene, scenes;

// --- 初始化入口 ---
initApp();

function initApp() {
    initButtons();
    baseCode();      // 1. 初始化渲染环境
    createScenes();  // 2. 创建 4 个 3D 场景
    initNavigation();// 3. 绑定 UI 事件
    animate();       // 4. 开始渲染
}

function baseCode() {
    container = document.querySelector('#main-content .container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0, 100, 300);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    clock = new THREE.Clock();

    window.addEventListener('resize', onWindowResize);
}

function createScenes() {
    // 场景 1: 医院总览 (此处可调用你的 scene1Help)
    scene1 = new THREE.Scene();
    scene1.background = new THREE.Color(0x020205);
    scene1.add(new THREE.GridHelper(500, 50, 0x444444, 0x222222));

    // 场景 2: 智慧物联
    scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0x0a1a2a);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(30), new THREE.MeshNormalMaterial());
    scene2.add(sphere);

    // 场景 3: 智慧服务
    scene3 = new THREE.Scene();
    scene3.background = new THREE.Color(0x051505);
    const torus = new THREE.Mesh(new THREE.TorusGeometry(40, 10), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
    scene3.add(torus);
    scene3.add(new THREE.AmbientLight(0xffffff, 1));

    // 场景 4: 智慧管理
    scene4 = new THREE.Scene();
    scene4.background = new THREE.Color(0x1a0a0a);
    const box = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    scene4.add(box);
    scene4.add(new THREE.PointLight(0xffffff, 1000, 500));

    scenes = [scene1, scene2, scene3, scene4];
    currentScene = scenes[0];
}
function switchScene(index) {
    const navItems = document.querySelectorAll('.nav-item');
    const panels = document.querySelectorAll('.panel-node');

    // UI
    navItems.forEach(n => n.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    if (navItems[index]) navItems[index].classList.add('active');
    if (panels[index]) panels[index].classList.add('active');

    // 3D
    if (scenes[index]) {
        currentScene = scenes[index];

        gsap.to(camera.position, {
            x: 0,
            y: 150,
            z: 400,
            duration: 1
        });

        gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1
        });
    }
}
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const panels = document.querySelectorAll('.panel-node');

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = Number(item.dataset.index);
            switchScene(index);
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (currentScene) {
        // 这里可以添加各个场景特有的动画
        renderer.render(currentScene, camera);
    }
}

function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function initButtons() {
    const detailBtn = document.getElementById('detail-view-btn');

    if (detailBtn) {
        detailBtn.addEventListener('click', (e) => {

            gsap.to(camera.position, {
                z: 150,
                duration: 1.5,
                ease: "power2.inOut"
            });

        });
    }
}
