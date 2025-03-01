import { promises as fs } from 'fs';
import { join } from 'path';

const backendDir = './node_modules/.prisma';
const frontendDir = '../Frontend/node_modules/.prisma';

/**
 * Ensures that a directory exists at the given path.
 * If the path exists and is not a directory, it logs an error.
 */
async function ensureDirExists(dir: string): Promise<boolean> {
    try {
        const stats = await fs.lstat(dir);
        if (!stats.isDirectory()) {
            console.error(`Path "${dir}" exists but is not a directory.`);
            return false;
        }
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            // Directory does not exist; create it.
            try {
                await fs.mkdir(dir, { recursive: true });
            } catch (mkdirErr) {
                console.error(`Error creating directory "${dir}":`, mkdirErr);
                return false;
            }
        } else {
            console.error(`Error checking path "${dir}":`, err);
            return false;
        }
    }
    return true;
}

/**
 * Recursively copies the contents of the source directory (src)
 * to the destination directory (dest), preserving symbolic links.
 */
async function copyDir(src: string, dest: string) {
    // Check if the source directory exists.
    try {
        await fs.access(src);
    } catch (err) {
        console.error(`Source directory "${src}" does not exist.`);
        return;
    }

    // Ensure the destination directory exists.
    if (!(await ensureDirExists(dest))) {
        console.error(`Failed to ensure destination directory "${dest}" exists.`);
        return;
    }

    let entries;
    try {
        entries = await fs.readdir(src, { withFileTypes: true });
    } catch (err) {
        console.error(`Error reading directory "${src}":`, err);
        return;
    }

    // Process each entry in the source directory.
    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        try {
            if (entry.isSymbolicLink()) {
                // Read the symbolic link target.
                const linkTarget = await fs.readlink(srcPath);
                // Remove the destination entry if it exists.
                try {
                    await fs.unlink(destPath);
                } catch (e: any) {
                    if (e.code !== 'ENOENT') {
                        console.error(`Error removing existing file "${destPath}":`, e);
                    }
                }
                // Create the symbolic link at the destination.
                await fs.symlink(linkTarget, destPath);
            } else if (entry.isDirectory()) {
                // Recursively copy subdirectories.
                await copyDir(srcPath, destPath);
            } else if (entry.isFile()) {
                // Copy files.
                await fs.copyFile(srcPath, destPath);
            }
        } catch (err) {
            console.error(`Error processing "${srcPath}":`, err);
        }
    }
}

// Execute the copy operation.
copyDir(backendDir, frontendDir)
    .then(() => console.log('Copy operation completed.'))
    .catch(err => console.error('Error during copy operation:', err));
