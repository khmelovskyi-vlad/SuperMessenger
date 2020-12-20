using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMessenger.Models
{
    public class ImageOptions
    {
        public string ImagePath { get; set; }
        public ImagePathesOptions ImagePartPathes { get; set; }

        public string Avatars
        {
            get
            {
                return ImagePartPathes.Avatars;
            }
            set
            {
                ImagePartPathes.Avatars = Path.Combine(ImagePath, value);
            }
        }
        public string GroupImages
        {
            get
            {
                return ImagePartPathes.GroupImages;
            }
            set
            {
                ImagePartPathes.GroupImages = Path.Combine(ImagePath, value);
            }
        }
        public string Files
        {
            get
            {
                return ImagePartPathes.Files;
            }
            set
            {
                ImagePartPathes.Files = Path.Combine(ImagePath, value);
            }
        }
    }
}
