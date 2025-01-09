import { ResumeData } from '@/types/resume';
import { parseResumeYaml, parseConfigYaml } from './yaml';
import fs from 'fs/promises';
import path from 'path';
import { ResumeConfig } from '@/types/config';

export async function getConfig(): Promise<ResumeConfig> {
  try {
    const configPath = path.join(process.cwd(), "next-resume.config");
    const configContent = await fs.readFile(configPath, "utf-8");
    const parsedConfig = await parseConfigYaml(configContent);
    return {
      font: parsedConfig.font,
      theme: parsedConfig.theme,
      hideButtons: parsedConfig.hideButtons,
      accessCodes: parsedConfig.accessCodes
    };
  } catch (error) {
    throw new Error(`Failed to load config file: next-resume.config - ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getResumeData(): Promise<ResumeData> {
  try {
    const yamlPath = path.join(process.cwd(), "next-resume.yaml");
    const yamlContent = await fs.readFile(yamlPath, "utf-8");
    const yamlData = await parseResumeYaml(yamlContent);
    
    return {
      metadata: yamlData.metadata ?? { name: '' },
      sections: yamlData.sections ?? []
    };
  } catch (error) {
    console.error('Error reading resume data:', error);
    return {
      metadata: { 
        name: 'Error loading data'
      },
      sections: []
    };
  }
}