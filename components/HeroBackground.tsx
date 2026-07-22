"use client";

import React, { useEffect, useRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { FileText, ImageIcon, Crop, Minimize2, GitMerge, FileOutput, Shield, RefreshCw, SplitSquareVertical } from "lucide-react";

interface HeroBackgroundProps {
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

// Node labels for the dynamic network
const FILE_TYPES = [
  "PDF", "PNG", "JPG", "WEBP", "ZIP", "DOCX", "SVG", "AI", "Video", "Audio",
  "Merge", "Split", "Compress", "Resize", "Convert", "Extract"
];

// Node themes for the dynamic colorful network
const THEMES = [
  { color: '59, 130, 246', label: 'PDF' },     // Blue
  { color: '236, 72, 153', label: 'Video' },   // Pink
  { color: '249, 115, 22', label: 'Image' },   // Orange
  { color: '16, 185, 129', label: 'PNG' },     // Emerald
  { color: '168, 85, 247', label: 'DOCX' },    // Purple
  { color: '6, 182, 212', label: 'SVG' },      // Cyan
];

export function HeroBackground({ smoothMouseX, smoothMouseY }: HeroBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Transforms
  const gridX = useTransform(smoothMouseX, [-500, 500], [4, -4]);
  const gridY = useTransform(smoothMouseY, [-500, 500], [4, -4]);
  
  const iconsX = useTransform(smoothMouseX, [-500, 500], [15, -15]);
  const iconsY = useTransform(smoothMouseY, [-500, 500], [15, -15]);
  
  // Floating decorative icons (Layer 4)
  const floatingIcons = [
    { Icon: FileText, top: "12%", left: "8%", delay: 0 },
    { Icon: ImageIcon, top: "28%", right: "10%", delay: 0.2 },
    { Icon: Crop, bottom: "35%", left: "12%", delay: 0.4 },
    { Icon: Minimize2, bottom: "22%", right: "18%", delay: 0.6 },
    { Icon: GitMerge, top: "45%", left: "4%", delay: 0.8 },
    { Icon: FileOutput, top: "48%", right: "6%", delay: 1 },
    { Icon: Shield, top: "8%", right: "28%", delay: 1.2 },
    { Icon: RefreshCw, bottom: "12%", left: "35%", delay: 1.4 },
    { Icon: SplitSquareVertical, bottom: "42%", right: "8%", delay: 1.6 },
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const CLUSTERS = [
      { id: 'TL', count: 5, bounds: { xMin: 0.02, xMax: 0.35, yMin: 0.05, yMax: 0.45 } },
      { id: 'TR', count: 4, bounds: { xMin: 0.65, xMax: 0.98, yMin: 0.05, yMax: 0.45 } },
      { id: 'BL', count: 3, bounds: { xMin: 0.02, xMax: 0.35, yMin: 0.55, yMax: 0.95 } },
      { id: 'BR', count: 5, bounds: { xMin: 0.65, xMax: 0.98, yMin: 0.55, yMax: 0.95 } },
    ];

    class NetworkNode {
      x: number; y: number;
      vx: number; vy: number;
      theme: typeof THEMES[0];
      label: string;
      cluster: typeof CLUSTERS[0];

      constructor(cluster: typeof CLUSTERS[0], index: number) {
        this.cluster = cluster;
        
        const b = this.cluster.bounds;
        const minX = width * b.xMin;
        const maxX = width * b.xMax;
        const minY = height * b.yMin;
        const maxY = height * b.yMax;

        this.x = minX + Math.random() * (maxX - minX);
        this.y = minY + Math.random() * (maxY - minY);
        
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.theme = THEMES[index % THEMES.length];
        this.label = FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)];
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;
        
        // Hover interaction (repel from mouse)
        const dx = this.x - mx;
        const dy = this.y - my;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < 120 && distToMouse > 0) {
            const force = (120 - distToMouse) / 120;
            this.vx += (dx / distToMouse) * force * 0.8;
            this.vy += (dy / distToMouse) * force * 0.8;
        }
        
        const b = this.cluster.bounds;
        const minX = width * b.xMin;
        const maxX = width * b.xMax;
        const minY = height * b.yMin;
        const maxY = height * b.yMax;

        // Soft bounce off cluster boundaries to keep them contained
        if (this.x < minX) { this.x = minX; this.vx *= -1; }
        if (this.x > maxX) { this.x = maxX; this.vx *= -1; }
        if (this.y < minY) { this.y = minY; this.vy *= -1; }
        if (this.y > maxY) { this.y = maxY; this.vy *= -1; }

        // Friction to prevent infinite acceleration
        this.vx *= 0.999;
        this.vy *= 0.999;
        
        // Random idle movement (slight wandering)
        if (Math.random() < 0.02) {
            this.vx += (Math.random() - 0.5) * 0.05;
            this.vy += (Math.random() - 0.5) * 0.05;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw Glowing Dot
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 30);
        gradient.addColorStop(0, `rgba(${this.theme.color}, 0.6)`);
        gradient.addColorStop(0.3, `rgba(${this.theme.color}, 0.2)`);
        gradient.addColorStop(1, `rgba(${this.theme.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Solid center point
        ctx.fillStyle = `rgba(${this.theme.color}, 1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw Pill Label
        const labelX = this.x + 12;
        const labelY = this.y - 12;
        
        ctx.font = "600 9px Inter, sans-serif";
        const textWidth = ctx.measureText(this.label).width;
        const paddingX = 8;
        const paddingY = 4;
        
        // Pill background
        ctx.fillStyle = `rgba(${this.theme.color}, 0.1)`;
        ctx.beginPath();
        ctx.roundRect(labelX, labelY - 8, textWidth + paddingX * 2, 16, 8);
        ctx.fill();
        
        // Pill text
        ctx.fillStyle = `rgba(${this.theme.color}, 0.9)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, labelX + textWidth / 2 + paddingX, labelY);
      }
    }

    // Initialize clusters of colorful nodes
    const nodes: NetworkNode[] = [];
    let nodeIndex = 0;
    CLUSTERS.forEach(cluster => {
      for (let i = 0; i < cluster.count; i++) {
        nodes.push(new NetworkNode(cluster, nodeIndex++));
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = smoothMouseX.get() + width / 2;
      const my = smoothMouseY.get() + height / 2;

      // Draw dashed connections first so they render under the nodes
      ctx.setLineDash([3, 6]);

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Reduced distance so they only connect tightly within their clusters
          if (dist < 280) {
            // Increased opacity base from 0.5 to 0.85 for better visibility
            const alpha = 0.85 * (1 - dist / 280);
            
            // Linear gradient stroke connecting the two node colors
            const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
            grad.addColorStop(0, `rgba(${nodeA.theme.color}, ${alpha})`);
            grad.addColorStop(1, `rgba(${nodeB.theme.color}, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5; // Slightly thicker line
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            
            // Draw a slight curve instead of a rigid straight line
            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2;
            
            // Generate a consistent offset for the curve based on nodes index
            const offset = dist * 0.15 * (i % 2 === 0 ? 1 : -1);
            
            ctx.quadraticCurveTo(midX + offset, midY - offset, nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }
      
      // Reset dash for other potential drawings
      ctx.setLineDash([]);

      // Draw Nodes on top
      nodes.forEach(node => {
        node.update(mx, my);
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden bg-white">
      
      {/* Layer 1: Minimal Radial Lighting */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.03) 0%, transparent 70%)' }}></div>

      {/* Layer 2: Interactive Blueprint Grid */}
      <motion.div 
        style={{ x: gridX, y: gridY }}
        className="absolute -inset-10 opacity-40"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNSwgMjMsIDQyLCAwLjA0KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_75%)]" />
      </motion.div>

      {/* Layer 3: Canvas Engine (Colorful Network Nodes & Connections) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 4: Floating File Icons */}
      {floatingIcons.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute text-[#CBD5E1] opacity-[0.03] blur-[1px]"
          style={{ 
            top: item.top, 
            left: item.left, 
            right: item.right, 
            bottom: item.bottom,
            x: iconsX,
            y: iconsY,
          }}
          animate={shouldReduceMotion ? {} : { 
            y: [0, -10, 0],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ duration: 10 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          <item.Icon className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1} />
        </motion.div>
      ))}

    </div>
  );
}
